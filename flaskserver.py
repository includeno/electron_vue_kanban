# -*- coding: utf-8 -*-
# 导入Flask类
import os
from flask import jsonify
from flask import request
from flask_cors import CORS
from flask import Flask, session, redirect, url_for, escape
import time
import datastructure
import functools
import datetime

#实例化，可视为固定格式
app = Flask(__name__)
CORS(app, supports_credentials=True)

#@functools.lru_cache(1)
def generate_data():
    return datastructure.generate_board()

def get_json(input):
    return str(input).replace("'",'"')

@app.route('/board', methods=["get"])
def download():
    ret =generate_data()
    outputfile=open("data/"+str(datetime.datetime.now)+".json","w",encoding="utf-8")
    outputfile.write(get_json(ret))
    outputfile.close()
    return jsonify(ret)

@app.route('/hello', methods=["get"])
def hello():
    print("hello world")
    return "hello world"

if __name__ == '__main__':
    # app.run(host, port, debug, options)
    # 默认值：host="127.0.0.1", port=5000, debug=False
    
    app.run(host="0.0.0.0", port=4321)
    