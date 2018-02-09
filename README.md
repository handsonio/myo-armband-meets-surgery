# Rapid Prototyping X Surgery ! !

This time we investigate a concrete use case and how the technology can be used to interact with computer without actually touching them ! For a short period of time, we are going to put ourselves in the shoes of a surgeon.

#Introducing the Myo Armband 

![wearables_myo-armband-teardown-02](https://handson.io/content/images/2018/02/wearables_myo-armband-teardown-02.jpg)

> The Myo armband is a wearable gesture control and motion control device that lets you take control of your phone, computer, and so much more, touch-free. source: [Myo.com](https://www.myo.com)

The main concept at work here is [Electromyography](https://en.wikipedia.org/wiki/Electromyography), in other words the armband uses 8 surface EMG electrodes to listen to the electrical activity of your forearm's muscles and is able (with the help of artificial intellingence) to detect a predefined set of gestures.

#Myo armband for surgery you said ?

We really like to demystifie how things work and inspire people to dream big and think about how they can impact the world. In this experiment we have been inspired by TedCas, a healthcare technology company producing natural and intuitive human-computer interfaces for healthcare.

![giphy--4-](https://handson.io/content/images/2018/02/giphy--4-.gif)

#Natural interaction

With this proptotype, we want to experiment (and share) how natural it could be to interact with a computer while performing in an operating room. This prototype does not necessarily target the surgeon him/herself but also the staff.

So far, you have probably guessed, we need at least two hardware components, the computer and the Myo. Those two components talk together through Bluetooh 4.1, this communication is bi-directional, the armband tells the computer which gesture is performed while the computer can decide to alert the user through an [haptic feedback](https://en.wikipedia.org/wiki/Haptic_technology), in this case a vibration.

There is still one missing part, the software layer. We decided to mimmic a system that allows the user to view medical imagery of the patient. In order to prototype this layer quickly, we just need a bunch of open source software and some web-development skills.

#The building blocks



Out-of-the box, the Myo armband comes with a small bluetooth dongle, this one is used by the application you instal on your machine to establish the communication. To get technical, the application layer already provided by Thalmic Labs exposes a web socket on the computer. As its name suggests, you can use a bunch of Javascript within a web page to access it ! Those two elements represents altogether the first building block of our prototype.

## Let's pilot the Browser's interface with the Myo !

We have to be lazy in order to prototype quickly (time is money!), so this time we use an [open source library](https://github.com/stolksdorf/myo.js) developed by Scott Tolksdorf to let the javascript layer to talk to the armband, either from the browser or from a Node.js application.  

One extremely cool thing about this prototype is that we can go a bit creative thanks to very smart UI components that make the life easier, we have a vision for the user experience and we first sketch it.

![Scan-9-Feb-2018-at-00.40](https://handson.io/content/images/2018/02/Scan-9-Feb-2018-at-00.40.jpg)


Two specific elements helped us to laid out the foundation for the interaction with the user. 

* "[Slick - the last carousel you'll ever need](http://kenwheeler.github.io/slick/)" is used in the left pane, reacts to LEFT or RIGHT to move the next "slide" of the carousel accordingly.

![_DSC0094](https://handson.io/content/images/2018/02/_DSC0094.jpg)

* "[LibGif.js - JavaScript GIF parser and player](https://github.com/buzzfeed/libgif-js)" is used to let the user navigate into the medical pictures, reacts to LEFT, RIGHT, FIST and detect rotation of the forearm to finely control the current image.

##Let's google it !

Find some animated gif of medical images that look professional and also demonstrate the potential of the digital imagery produced by today's medical equipment applied to innovation in the field of human machine interaction. 

![head_skeleton_scan_bw_animated](https://handson.io/content/images/2018/02/head_skeleton_scan_bw_animated.gif)

![front_head_skeleton_vessels](https://handson.io/content/images/2018/02/front_head_skeleton_vessels.gif) 


## Let's code and pitch

We have the vision, we confirm feasability for a very quick prototyping. We just need to put the glue to hold the pieces together, the html/javascript code of this prototype is [located in this repository](https://github.com/handsonio/myo-armband-meets-surgery/tree/master).

![giphy-downsized-large](https://handson.io/content/images/2018/02/giphy-downsized-large.gif)

# Conclusion

We learn a lot during this experiment, the entire prototype has been created quick fast in only a few hours.

The haptic feedback given by the application work well and it is very intuitive. However, we are not convince that this technology in its existing form will make its way into the operating room where everything need to be properly sanitized.


Links : 
* [TedCas & Voice+Myo armband at the AMC](https://www.youtube.com/watch?v=HTSjslXzTmE)
* [Myo Armband + TedCas](https://www.youtube.com/watch?v=ngcVtQQ4V2Q)





