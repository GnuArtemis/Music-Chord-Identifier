# Music-Chord-Identifier

## Description
Our goal with this project is to create a simple, accessible tool that can be used for learning basic music theory at an approximately 5th-grade level. By way of a virtual keyboard, users can designate note combinations, and upon submission, an analysis of the chord (root and quality, or interval type if less than 3 unique notes) will be displayed. The program displays an exact match if one can be found, and the most likely result with side list of less likely results if no exact match exists. Upon recieving a chordal input, users can also seek out further information about each chord, with a piano representation, a sound byte example, and in certain situations a definition.

Compared to existing tools, we are prioritizing accessibility: users primarily recieve the simplest, most likely result, displayed as a section on the current page. Users DO NOT need an prior music theory knowledge in order to determine what the result is.

We are using materialize and an open-source Javascript keyboard to display the page, in addition to server side APIs for recieving data.


## Technologies Used
[API/Reverse Chord Identifier](www.tofret.com/reverse-chord-finder)

[API/Chord Sound, Piano Display, and Progression](https://www.scales-chords.com/api/)

[Materialize](https://materializecss.com/)

[Audiosynth.js and playKeyboard.js](https://1000mileworld.com/Portfolio/Piano/keyboard.html)



## User Story
AS A music student
I WANT a tool to help me learn to analyze chords
GIVEN THAT I press notes on a keyboard
THEN I recieve the name of that chord
GIVEN THAT I type in an interval
THEN I recieve the name of that interval, including the case of unison
GIVEN THAT I have recieved a chord analysis
THEN I can see a visual respresentation and hear an example


## Further information and Deployed Site
[Website](https://gnuartemis.github.io/Music-Chord-Identifier/index.html)

[GitHub](https://github.com/GnuArtemis/Music-Chord-Identifier) 


## Visuals
![image](https://user-images.githubusercontent.com/69055538/94383998-6a482580-00f6-11eb-85e1-a0873547c49a.png)

*Plugging in a chord with an exact match*



![image](https://user-images.githubusercontent.com/69055538/94384218-daef4200-00f6-11eb-8fcc-998ce9f0896e.png)

*Plugging in a chord WITHOUT an exact match*



![image](https://user-images.githubusercontent.com/69055538/94384309-20137400-00f7-11eb-945a-b24556a6a2be.png)

*Mobile view--Portrait*



![image](https://user-images.githubusercontent.com/69055538/94384415-6668d300-00f7-11eb-81b3-0a53d25c82bd.png)

*Mobile view-Landscape*


![image](https://user-images.githubusercontent.com/69055538/94384623-e2631b00-00f7-11eb-949f-c13672c076f5.png)

*About us page*



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
 
## Auhors and Acknowledgement
For further information, feel free to contact at annmguinee@gmail.com.

[Ann Guinee](https://github.com/GnuArtemis)

[Caitlin Bouroncle](https://github.com/caitlinbou)

[Matt Weber](https://github.com/webermg)

[Scott Dancer](https://github.com/ScottDancer)

[Petar Zivkovic](https://github.com/Petar85)


## License
[MIT]Copyright (c) [2020] [Ann Guinee, Caitlin Bouroncle, Matt Weber, Scott Dancer, Petar Zivkovic]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
