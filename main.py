from flask import Flask, render_template, request
import random
import pickle
#import webbrowser
app = Flask(__name__)


@app.route("/")
def home():
    return render_template("gameList.html")

@app.route("/cricket",methods=['POST','GET'])
def cricket():
    try:
        if request.method == "POST":
            mplayer1=request.form.get('mteam1')
            mplayer2=request.form.get('mteam2')
            mplayer3=request.form.get('mteam3')
            mplayer4=request.form.get('mteam4')
            mplayer5=request.form.get('mteam5')
            dplayer1=request.form.get('dteam1')
            dplayer2=request.form.get('dteam2')
            dplayer3=request.form.get('dteam3')
            dplayer4=request.form.get('dteam4')
            dplayer5=request.form.get('dteam5')
            toss=request.form.get('toss')
            commentry=request.form.get("commentry")
            overs = int(request.form.get('overs')) * 6
            myteam = {mplayer1:-1, mplayer2:-1, mplayer3:-1, mplayer4:-1, mplayer5:-1}
            dteam = {dplayer1:-1, dplayer2:-1, dplayer3:-1, dplayer4:-1, dplayer5:-1}
            if toss == "bowling":
                data={'myteam':myteam,'dteam':dteam,'batting':2, 'overs':overs,'commentry':commentry}
            else:
                data={'myteam':myteam,'dteam':dteam,'batting':1, 'overs':overs,'commentry':commentry}
            return render_template('cricket.html',data=data)
    except Exception as e:
        print(e)
    return render_template("cricketForm.html")
    
@app.route("/typing",methods=['POST','GET'])
def typing():
    highscore=0
    try:
        dbfile = open('highScoreTyping.pkl','rb')
        db = {}
        db = pickle.load(dbfile)
        highscore = db['highscore']
        dbfile.close()
    except Exception as e:
        print(e)

    try:
        if request.method == "POST":
            newHighscore = int(request.form.get('highscore'))
            if newHighscore > highscore:
                highscore = newHighscore
                scr = {}
                scr['highscore']=highscore
                fileobj = open('highScoreTyping.pkl','wb')
                pickle.dump(scr,fileobj)
                fileobj.close() 
    except Exception as e:
        print(e)

    with open("words_alpha.txt","r") as f:
        ls = f.read().splitlines()
        random.shuffle(ls)
        ls = ls[0:100]
    return render_template("typingGame.html",data=ls,highscore=highscore) 

@app.route("/number")
def number():
    return render_template("numberGame.html")

@app.route("/sorting",methods=['POST','GET'])
def sortingForm():
    if request.method == "POST":
        try:
            if request.method == "POST":
                algo = request.form.get('algo')
                typeArray = request.form.get('arrayType')
                sizeOfArray=""
                getArray=""
                if typeArray == "random":
                    sizeOfArray = request.form.get('size')
                    data = {'algo':algo,'typearray':typeArray,'sizeOfArray':sizeOfArray, 'getArray':getArray}
                    return render_template("sorting.html",data=data)
                else:
                    getArray = request.form.get('array')
                    print(getArray)
                    data = {'algo':algo,'typearray':typeArray,'sizeOfArray':sizeOfArray, 'getArray':getArray}
                    return render_template("sorting.html",data=data)
        except Exception as e:
            print(e)

    return render_template("myForm.html")


#webbrowser.open("http://127.0.0.1:5000/")

#app.run(host='0.0.0.0',port=5000)