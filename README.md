# emflex-cloud
This is a collection of web applications that go together with emflex prototypes.
## GPS tracking application
This application is used by GPS tracker prototype to show location of the device(s) on the Google Map.

### Run locally

Install prerequisites
`npm install`

Start Redis DB
`redis-server`

Run the application
`DEBUG=myapp:* npm start`

### Usage guide
Main page is
[localhost:3000](localhost:3000)

To add a new marker the following is used by a device
[localhost:3000/users?name=Tracker1&lat=39.950712&lng=-75.144815](localhost:3000/users?name=Tracker1&lat=39.950712&lng=-75.144815)

## Demo
[GPS demo on heroku hosting](https://emflex-cloud.herokuapp.com/)





