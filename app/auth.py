import datetime, random
from .models import Map, Topic
from app import db

# get time
def get_time():
    time = datetime.datetime.now().strftime("%b %d, %Y - %H:%M:%S")
    return time

# get key
def key(length):
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    temp = random.choice(chars[:51])
    for x in range(length):
        temp += random.choice(chars)
    return temp

# add map
def map_add(map_name):
    add_key = key(20)
    add_map = Map(map_name=map_name, time_line=get_time(), key=add_key)
    db.session.add(add_map)
    db.session.commit()
    
    check_map = Map.query.filter_by(key=add_key).first()
    if check_map:
        return check_map
    else:
        return False

# get map
def map_get(map_name=None):
    if map_name:
        get_map = Map.query.filter(Map.map_name.like(f'%{map_name}%')).all()
        temp = {}
        if get_map:
            for x in get_map:
                temp[x.key] = {
                    'id':x.id,
                    'map_name':x.map_name,
                    'time':x.time_line,
                    'key':x.key
                }
        return temp
    else:
        get_map = Map.query.all()
        temp = {}
        for x in get_map:
            temp[x.key] = {
                'id':x.id,
                'map_name':x.map_name,
                'time':x.time_line,
                'key':x.key
            }
        return temp

# add map
def topic_add(topic_name, map_key):
    add_key = key(20)
    add_map = Topic(topic_name=topic_name, time_line=get_time(), key=add_key, map_id=map_key)
    db.session.add(add_map)
    db.session.commit()
    response = False
    check_map = Topic.query.filter_by(key=add_key).first()
    if check_map:
        response = True
    else:
        response = False
    return response
  
# get map
def topic_get(map_key=None):
    if map_key:
        get_topic = Topic.query.filter_by(map_id=map_key)
        temp = {}
        for x in get_topic:
            temp[x.id] = {
                'id':x.id,
                'topic_name':x.topic_name,
                'time':x.time_line,
                'key':x.key,
                'complate':x.complate
            }
        return temp
    else:
        get_topic = Topic.query.all()
        temp = {}
        for x in get_topic:
            temp[x.key] = {
                'id':x.id,
                'map_name':x.map_name,
                'time':x.time_line,
                'key':x.key
            }
        return temp
    
# complate topic
def topic_complate(topic_key):
    check_topic = Topic.query.filter_by(key=topic_key).first()
    response = False
    if check_topic:
        update = Topic.query.filter_by(key=topic_key).first()
        update.complate = True
        db.session.commit()
        response = True
    return response

# update topic
def topic_update(topic_name, topic_key):
    response = False
    check_key = Topic.query.filter_by(key=topic_key).first()
    if check_key:
        check_key.topic_name = topic_name
        db.session.commit()
        response = True
    return response

# delete topic
def topic_delete(topic_key):
    response = False
    check_key = Topic.query.filter_by(key=topic_key).first()
    if check_key:
        db.session.delete(check_key)
        db.session.commit()
        response = True
    return str(response)
