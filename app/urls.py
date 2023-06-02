from app import app
from .views import Index, get_map, get_map_search, add_map, get_topic, add_topic, complate_topic, update_topic, delete_topic

@app.route("/")
def index():
    return Index()

@app.route("/get-map/", methods=['GET','POST'])
def getmap():
    return get_map()

@app.route("/get-map/<query>", methods=['GET','POST'])
def getmapsearch(query):
    return get_map_search(query)

@app.route("/add-map/", methods=['GET','POST'])
def addmap():
    return add_map()

@app.route("/get-topic/", methods=['GET','POST'])
def gettopic():
    return get_topic()

@app.route("/add-topic/", methods=['GET','POST'])
def addtopic():
    return add_topic()

@app.route("/complate-topic/", methods=['GET','POST'])
def complatetopic():
    return complate_topic()

@app.route("/update-topic", methods=['GET','POST'])
def updatetopic():
    return update_topic()

@app.route("/delete-topic", methods=['GET','POST'])
def deletetopic():
    return delete_topic()

