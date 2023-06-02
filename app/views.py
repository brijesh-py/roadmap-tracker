from flask import request, redirect, jsonify, url_for
from .auth import map_add, map_get, topic_add, topic_get, topic_complate, topic_update, topic_delete

def Index():
    return jsonify("ok")

def get_map():
    response = map_get()
    return jsonify(response)

def get_map_search(map_name):
    response = map_get(map_name)
    return jsonify(response)

def add_map():
    if request.method == 'POST':
        map_name = request.form['map']
        response = map_add(map_name)
        return jsonify(response)
    return jsonify("map")

def get_topic():
    if request.method == 'POST':
        map_key = request.form['map_key']
        response = topic_get(map_key)
        return jsonify(response)
    return jsonify('get topic')

def add_topic():
    if request.method == 'POST':
        topic_name = request.form['topic_name']
        map_key = request.form['key']
        response = topic_add(topic_name, map_key)
        return jsonify(response)
    return jsonify('topic')

def complate_topic():
    topic_key = request.args['topic-key']
    response = topic_complate(topic_key)
    return jsonify(response)

def update_topic():
    topic_name = request.args['topic_name']
    topic_key = request.args['topic_key']
    response = topic_update(topic_name, topic_key)
    return response

def delete_topic():
    topic_key = request.args['topic_key']
    response = topic_delete(topic_key)
    return response
