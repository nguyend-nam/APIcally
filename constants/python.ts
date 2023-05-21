export const variableTypes = {
  number: "Number",
  object: "Object",
  string: "String",
  bool: "Boolean",
};

export const multipleStates = {
  none: "None",
  array: "Array",
};

export const modelFileExtensions = [
  "gz",
  "tgz",
  "tf",
  "pb",
  "pth",
  "pt",
  "h5",
  "hdf5",
  "onnx",
  "pkl",
];

export const pythonInitCode = `"""Required import-----------------------------------------"""
#Required modules, do not edit!
import sys
from unittest import result
import json
#End of required modules

"""import----------------------------------------------------"""
#USER MODULES BEGIN Import
#TODO
from symspellpy import SymSpell, Verbosity
import pkg_resources
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
sym_spell = SymSpell()
dictionary_path = pkg_resources.resource_filename(
    "symspellpy", "frequency_dictionary_en_82_765.txt"
)
sym_spell.load_dictionary(dictionary_path, 0, 1)
input_term=request['term']
suggestions = sym_spell.lookup(input_term, Verbosity.CLOSEST,
                               max_edit_distance=2, include_unknown=True)

res = []
for suggestion in suggestions:
	res.append(suggestion.term)
	
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
    "data": res
    #TODO
}
#JSON OR JSON ARRAY RESULT END 1

"""def---------------------------------------------------------"""
#USER FUNCTIONS BEGIN 2
#TODO

#USER FUNCTIONS END 2

"""DO NOT REMOVE-----------------------------------------"""
#REQUIRED CODE, DO NOT MODIFY!
print(result)`;

export const pythonInitCode1 = `"""Required import-----------------------------------------"""
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
    "data": "ok"
    #TODO
}
#JSON OR JSON ARRAY RESULT END 1

"""def---------------------------------------------------------"""
#USER FUNCTIONS BEGIN 2
#TODO

#USER FUNCTIONS END 2

"""DO NOT REMOVE-----------------------------------------"""
#REQUIRED CODE, DO NOT MODIFY!
print(result)`;
