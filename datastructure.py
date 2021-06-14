import uuid
import random

def random_str():
    return str(uuid.uuid1())

def get_json(input):
    return str(input).replace("'",'"')

def generate_check_list():
    data={
        "check_list_title": "",
        "check_list_items": [#{"a": "1"},
            
        ]
    }
    data.update({"check_list_title": random_str()})
    for i in range(random.randint(0,7)):
        next=random.randint(0,100)
        item={}
        name="check_list_items"+random_str()
        name="a"
        if(next>50):
            item={name:"1"}
        else:
            item={name:"0"}
        data['check_list_items'].append(item)
    return data


def generate_card():
    card = {
        "laebl": [
            {"labelname": "blue"}
        ],
        "title": "",
        "checklist": [
            # {
            #     "check_list_title": "",
            #     "check_list_items": [
            #         {"a": "1"},
            #         {"a": "0"}
            #     ]
            # }
        ]
    }
    card.update({"title": "card_title"+random_str()})
    for i in range(random.randint(1,7)):
        card['checklist'].append(generate_check_list())
    return card


def generate_cardlist_item(id,card):
    cardlistitem = {
        "id": str(id),
        "card":card
    }
    return cardlistitem


def generate_cardlist():
    cardlist={"header":random_str(),"cardlist":[]}
    for i in range(random.randint(1,7)):
        cardlist['cardlist'].append(generate_cardlist_item(i,generate_card()))
    return cardlist

#生成board的数据
def generate_board():
    board={"boardname":"boardname_1","boardcardlists":[]}
    for i in range(random.randint(1,10)):
        board['boardcardlists'].append(generate_cardlist())
    return board

