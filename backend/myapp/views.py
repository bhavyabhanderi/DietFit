from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers
import os
import google.generativeai as genai
from django.middleware.csrf import get_token

API_KEY='AIzaSyClJ0peHrzwgt47uBgjYoMepA7TCF35dzM'

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token}) 

@csrf_exempt
def login(request):
    if request.method=='POST':
        data = json.loads(request.body)
        email1 = data.get('email')
        passward1 = data.get('password')
        e1= serializers.serialize('json', user.objects.filter(email=email1,password=passward1))
        if e1 is not None:
            return JsonResponse(e1,safe=False)
        else:
            return JsonResponse(e1,safe=False)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        name = data.get('name')
        number = data.get('number')
        passward = data.get('password')
        user.objects.create(name=name,number=number,email=email,password=passward)
        return JsonResponse(data)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})




@csrf_exempt
def chat(request):
    if request.method == "POST":
        try:
            print("Request body:", request.body)
            
            try:
                data = json.loads(request.body)
                print("Parsed data:", data)
            except json.JSONDecodeError as json_err:
                print("JSON parsing error:", json_err)
                return JsonResponse({'error': 'Invalid JSON in request body'}, status=400)

            required_fields = ['height', 'weight', 'age', 'gender', 'goal_weight', 'time','veg_nonveg']
            for field in required_fields:
                if field not in data or not data[field]:
                    return JsonResponse({'error': f'{field} cannot be empty'}, status=400)

            user_message = json.dumps(data)  

            try:
                genai.configure(api_key=API_KEY)
            except Exception as e:
                print("Error in configuring genai:", e)
                return JsonResponse({'error': 'Failed to configure AI model'}, status=500)

            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            try:
                model = genai.GenerativeModel(
                    model_name="gemini-1.5-flash",
                    generation_config=generation_config,
                    system_instruction=(
                        "You are a doctor, and I will provide data about height, weight, age, gender, goal_weight, time in json format like this."
                        "{'height':'','weight':'','age':'','gender':'','goal_weight':'','time':'','veg_nonveg':''} "
                        "You should suggest a diet plan for a week in json format like this: "
                        "{'monday':[{'breakfast':'','lunch':'','dinner':''}], 'tuesday':[{'breakfast':'','lunch':'','dinner':''}],"
                        "'wednesday':[{'breakfast':'','lunch':'','dinner':''}], 'thursday':[{'breakfast':'','lunch':'','dinner':''}],"
                        "'friday':[{'breakfast':'','lunch':'','dinner':''}], 'saturday':[{'breakfast':'','lunch':'','dinner':''}]}"
                    ),
                )
            except Exception as e:
                print("Error creating AI model:", e)
                return JsonResponse({'error': 'Failed to initialize AI model'}, status=500)

            try:
                chat_session = model.start_chat(history=[])
            except Exception as e:
                print("Error starting chat session:", e)
                return JsonResponse({'error': 'Failed to start chat session'}, status=500)

            try:
                print("Sending message to AI:", user_message)
                ai_response = chat_session.send_message(user_message)
                print("AI response (raw):", ai_response.text)
            except Exception as e:
                print("Error sending message to AI model:", e)
                return JsonResponse({'error': 'Failed to communicate with AI model'}, status=500)

            try:
                response_json = json.loads(ai_response.text)
                print("Parsed AI response:", response_json)
            except json.JSONDecodeError as e:
                print("Error parsing AI response:", e)
                return JsonResponse({'error': 'Invalid JSON from AI model'}, status=500)

            return JsonResponse(response_json, safe=False)
        
        except Exception as e:
            print(f"Unhandled Server Error: {str(e)}")
            return JsonResponse({'error': 'Internal server error', 'details': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)


@csrf_exempt
def buy_product(request):
    if request.method == "POST":
        data = json.loads(request.body)

        new_purchase = buy(
            buy_name=data.get('name'),
            number=data.get('phone'),
            address=data.get('address'),
            pincode=data.get('pincode'),
            card_no=data.get('card'),
            paid=data.get('total_price'),
        )
        new_purchase.save()

        return JsonResponse({'status': 'success', 'message': 'Purchase successful!'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def chatbox(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('msg')

            if not user_message:
                return JsonResponse({'error': 'Message is required'}, status=400)

            genai.configure(api_key=API_KEY)

            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 100,
                "response_mime_type": "text/plain",
            }

            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                generation_config=generation_config,
                system_instruction="You are a diet recommendation specialist. Answer based on food, health, and calorie requirements."
            )

            chat_session = model.start_chat(history=[])

            response = chat_session.send_message(user_message)

            ai_message = response.text

            return JsonResponse({'message': ai_message})

        except Exception as e:
            print(f"Error: {e}") 
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def del_data(request):
    # ADMIN.objects.all().delete() 
    if request.method=='GET':
        # PRODUCT.objects.filter(name='ALMOND').delete() 
        # user.objects.all().delete()
        # cart.objects.all().delete()
        # buy.objects.all().delete()
        return True
    return True


@csrf_exempt
def get_meal_by_cal(request):
    if request.method == "POST":
        try:
            print("Request body:", request.body)
            
            try:
                data = json.loads(request.body)
                print("Parsed data:", data)
            except json.JSONDecodeError as json_err:
                print("JSON parsing error:", json_err)
                return JsonResponse({'error': 'Invalid JSON in request body'}, status=400)

            required_fields = ['protein', 'carbs', 'fat', 'suger', 'fiber', 'calory']
            for field in required_fields:
                if field not in data or not data[field]:
                    return JsonResponse({'error': f'{field} cannot be empty'}, status=400)

            user_message = json.dumps(data)  

            try:
                genai.configure(api_key=API_KEY)
            except Exception as e:
                print("Error in configuring genai:", e)
                return JsonResponse({'error': 'Failed to configure AI model'}, status=500)

            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            try:
                model = genai.GenerativeModel(
                    model_name="gemini-1.5-flash",
                    generation_config=generation_config,
                    system_instruction=(
                        "You are a doctor, and I will provide data about protien, carbs, fat, oil, fiber, calory in json format like this."
                        "{'protien':'','carbs':'','fat':'','suger':'','fiber':'','calory':'',} "
                        "You should suggest a meal based on this data for a hole day in json format like this: "
                        "{'breakfast_meal':'','breakfast_meal_instruction':'','lunch_meal':'','lunch_meal_instruction':'','dinner_meal':'','dinner_meal_instruction':'',}"
                    ),
                )
            except Exception as e:
                print("Error creating AI model:", e)
                return JsonResponse({'error': 'Failed to initialize AI model'}, status=500)

            try:
                chat_session = model.start_chat(history=[])
            except Exception as e:
                print("Error starting chat session:", e)
                return JsonResponse({'error': 'Failed to start chat session'}, status=500)

            try:
                print("Sending message to AI:", user_message)
                ai_response = chat_session.send_message(user_message)
                print("AI response (raw):", ai_response.text)
            except Exception as e:
                print("Error sending message to AI model:", e)
                return JsonResponse({'error': 'Failed to communicate with AI model'}, status=500)

            try:
                response_json = json.loads(ai_response.text)
                print("Parsed AI response:", response_json)
            except json.JSONDecodeError as e:
                print("Error parsing AI response:", e)
                return JsonResponse({'error': 'Invalid JSON from AI model'}, status=500)

            return JsonResponse(response_json, safe=False)
        
        except Exception as e:
            print(f"Unhandled Server Error: {str(e)}")
            return JsonResponse({'error': 'Internal server error', 'details': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)    

@csrf_exempt
def get_meal_by_ingredient(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Parsed data:", data)

            required_fields = ['ingredient1', 'ingredient2', 'ingredient3']
            for field in required_fields:
                if field not in data or not data[field]:
                    return JsonResponse({'error': f'{field} cannot be empty'}, status=400)

            user_message = json.dumps(data)

            try:
                genai.configure(api_key=API_KEY)
            except Exception as e:
                return JsonResponse({'error': 'Failed to configure AI model'}, status=500)

            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            try:
                model = genai.GenerativeModel(
                    model_name="gemini-1.5-flash",
                    generation_config=generation_config,
                    system_instruction=(
                        "You are a chef. I will provide you with ingredients in a JSON format like this: "
                        "{'ingredient1':'','ingredient2':'','ingredient3':''}. "
                        "You will suggest a meal in JSON format like this: "
                        "{'meal':'','meal_instructions':''}."
                    ),
                )
            except Exception as e:
                return JsonResponse({'error': 'Failed to initialize AI model'}, status=500)

            try:
                chat_session = model.start_chat(history=[])
            except Exception as e:
                return JsonResponse({'error': 'Failed to start chat session'}, status=500)

            try:
                ai_response = chat_session.send_message(user_message)
                response_json = json.loads(ai_response.text)
            except Exception as e:
                return JsonResponse({'error': 'Failed to communicate with AI model'}, status=500)

            return JsonResponse(response_json, safe=False)
        
        except Exception as e:
            return JsonResponse({'error': 'Internal server error', 'details': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)    