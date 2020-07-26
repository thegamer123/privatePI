from flask import Flask , request
from werkzeug.utils import secure_filename
import os
import random
import string

UPLOAD_FOLDER = './uploads/'
URL_SERVER = 'http://127.0.0.1:5000/'

app = Flask(__name__ , static_folder="./uploads")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods = ['GET', 'POST'])
def upload():
    # URL_SERVER = request.base_url
    if request.method == 'POST':
        # file = request.files[]
        file = request.files['file']
        file_name = f'{get_random_string(50)}.png'
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
        return str(f'{URL_SERVER}uploads/{file_name}')

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

# to run server 
# 
# export FLASK_APP=flask_server
# export FLASK_ENV=development
# flask run