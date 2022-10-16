export const pythonInitCode = `"""Required import-----------------------------------------"""
#Required modules, do not edit!
import sys
from unittest import result
import json
#End of required modules

"""import----------------------------------------------------"""
#USER MODULES BEGIN Import
#TODO

#USER MODULES END Import

"""Get request----------------------------------------------"""
#GET REQUEST BODY BEGIN
#do not modify this line!
request = (json.loads(sys.argv[1]))
#GET REQUEST BODY END
"""
The variable 'request' contains the body of the request from clients
"""

"""Code------------------------------------------------------"""
#USER CODE BEGIN 1
#TODO

#USER CODE END 1

"""def--------------------------------------------------------"""
#USER FUNCTIONS BEGIN 1
#TODO

#USER FUNCTIONS END 1

"""Code------------------------------------------------------"""
#USER CODE BEGIN 2
#TODO

#USER CODE END 2

"""Result-----------------------------------------------------"""
#JSON OR JSON ARRAY RESULT BEGIN 1
#do not modify the variable name!
result = {
    "data": "Hello world"
    #TODO
}
#JSON OR JSON ARRAY RESULT END 1

"""def---------------------------------------------------------"""
#USER FUNCTIONS BEGIN 2
#TODO

#USER FUNCTIONS END 2

"""DO NOT REMOVE-----------------------------------------"""
#REQUIRED CODE, DO NOT MODIFY!
print(json.dumps(result))
sys.stdout.flush()`;
