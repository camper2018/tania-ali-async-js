// Introducing workers

// Javascript is a single threaded language.
// Workers give us the ability to run some tasks in a different thread, so we can start the task, then continue with other processing (such as handling user actions).

//A thread is a sequence of instructions that a program follows. 
/*
One concern from all this is that if multiple threads can have access to the same shared data, it's possible for them to change it independently and unexpectedly (with respect to each other). This can cause bugs that are hard to find.
To avoid these problems on the web, your main code and your worker code never get direct access to each other's variables, and can only truly "share" data in very specific cases. Workers and the main code run in completely separate worlds, and only interact by sending each other messages. In particular, this means that workers can't access the DOM (the window, document, page elements, and so on).
*/

/* There are three different sorts of workers:

dedicated workers :  are used by a single script instance.
shared workers :  can be shared by several different scripts running in different windows.
service workers : act like proxy servers, caching resources so that web applications can work when the user is offline. They're a key component of Progressive Web Apps.


*/

