from app import db

model = db.Model
column = db.Column
integer = db.Integer()
string = db.String()
json = db.JSON()
boolean = db.Boolean()

# map class
class Map(model):
    id = column(integer, primary_key=True)
    map_name = column(string, nullable=False)
    time_line = column(string, nullable=False)
    key = column(string, nullable=False, unique=True)
    topics = db.relationship('Topic', backref='map', lazy=True) 

    def __init__(self, map_name, time_line, key):
        self.map_name = map_name
        self.time_line = time_line
        self.key = key


# topic class
class Topic(model):
    id = column(integer, primary_key=True)
    topic_name = column(string, nullable=False)
    time_line = column(string, nullable=False)
    key = column(string, nullable=False, unique=True)
    complate = column(boolean, default=False)
    map_id = column(string, db.ForeignKey('map.key'), nullable=False)

    def __init__(self, topic_name, time_line, key, map_id):
        self.topic_name = topic_name
        self.time_line = time_line
        self.key = key
        self.map_id = map_id


        