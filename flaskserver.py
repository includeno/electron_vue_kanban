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
import copy

#实例化，可视为固定格式
app = Flask(__name__)
CORS(app, supports_credentials=True)


def generate_data():
    return datastructure.generate_board()

def get_json(input):
    return str(input).replace("'",'"')

data=[]
for i in range(2):
    board_data=generate_data()
    data.append(board_data)

def get_board_by_id(id):
    for board in data:
        if(board['boardid']==str(id).strip()):
            return board
    return None
def get_board_by_name(name):
    for board in data:
        if(board['boardname']==str(name).strip()):
            return board
    return None
@app.route('/board', methods=["post"])
def board_info():
    id=request.form.get("boardid")
    ret =get_board_by_id(id)
    #outputfile=open("data/"+str(datetime.datetime.now)+".json","w",encoding="utf-8")
    #outputfile.write(get_json(ret))
    #outputfile.close()
    return jsonify(ret)

#DONE
@app.route('/v1/cards', methods=["post"])
def add_card():
    cardListId=request.form.get("cardListId")#required
    title=request.form.get("title")#optional
    card=datastructure.default_card()
    card['title']=title
    
    cardId=datastructure.random_str()
    card.update({"id":cardId})

    for board in data:
        for cardlist in board['boardcardlists']:
            if(cardlist["cardListId"]==str(cardListId)):
                cardlist['cardList'].append(card)
    ret={"code":"1","id":cardId}
    return jsonify(ret)

#DONE
@app.route('/v1/cards', methods=["put"])
def update_card():
    id=request.form.get("id")#required
    title=request.form.get("title")#optional
    
    for board in data:
        for cardlist in board['boardcardlists']:
            for card in cardlist["cardList"]:
                if(card["id"]==str(id)):
                    card["title"]=title
    ret={"code":"1","id":id}
    return jsonify(ret)

@app.route('/boardlist', methods=["get"])
def board_list():
    boardlist=copy.deepcopy(data)
    for board in boardlist:
        board['boardcardlists']=[]
        
    return jsonify(boardlist)

if __name__ == '__main__':
    # app.run(host, port, debug, options)
    # 默认值：host="127.0.0.1", port=5000, debug=False
    
    app.run(host="0.0.0.0", port=4321)
    