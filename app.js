/*var BudgetController=(function(){
    var x=23;
    var add=function(a){return x+a;}/*this is just a variable and function to show how a module pattern works.we know that IIFE allow us to have data privacy because it creates new scope that is not visible from the outside scope.so our variable and function are safe in here and they cant be accessed from outside.the secret of module pattern is that it retuns an object containing all of the functions that we want to have public.so the function tht we want to give outside scope to access to*/
    /*return {publicTest:function(b)
           {
               return add(b)
               ;
           }}
})();/*invoking the function*/
/*the two modules that we created are completely independent modules.so there will not be any interaction between these two ever as we want them to be as stand alone as independent as possible.sor example imagine that if we wanted to create more complex budget app but a completely different user interface we can take BudgetController module and then expand it and not think about the user interface at all because the user interface is separated from the data and they dont communicate at all and that is called separation of concerns.separation of concerns basically means that each part of the application should only be interested in doing one thing independently.so both the controllers i.e BudgetController and UIController dont know about each other.they are stand alone and they dont know that the other one exists*/ 

/*var UIController=(function(){
   
    
})();
 /*we need some way to have these two connected.For ex we need a way to read the data from the user interface and then add that data as a new expense in the BudgetController.And so we create a third module which is the appController*/
/*modules can recieve arguements as they are just a function expressions.so we can pass arguements into them.In this module we are passing the other two modules so that this module knows about the other twoand can connect to them.we can actually use the two modules in this module without passing them as an arguement as they are in the outer scope but it is not a good practice */
/*var appController=(function(budgetCtrl,UICntrl){
    var z=budgetCtrl.publicTest(5);
return {anotherPublic:function(){
    console.log(z);
}}
})(BudgetController,UIController);*/



/*in this we will learn how to set up the event listeners for keypress events*/
/*how to use event object*/
//BUDGET CONTROLLER
var BudgetController=(function(){
    var Expense=function(id,description,val){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    var Income=function(id,description,val){
         this.id=id;
        this.description=description;
        this.value=value;
    };
   
    
    var data={
        allitems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    }
    return{
        addItem:function(type,des,val){
            var newItem,ID;
            ID=0;/*it is a unique number that we want to assign to new new item that we put either in the expense or income arrays for the allitems*/
            ID=data.allitems[type][data.allitems[type].length-1]/*suppose the type is inc then we are doing data.allitems[inc] and this will be an inc array and thn in inc array we are simply selecting the last element*/
            if(type==='exp')/*if we recieve exp string in the type then new object will be created then Expense will be called and all the things will be assigned to newItem*/{
            newItem=new Expense(ID,des,val);
        }
        else if(type==='inc'){
            newItem=new Income(ID,des,val);
        }
        data.allitems[type].push(newItem);/*we are selecting the array in the type as type is exp or inc and after selecting the array,we are pushing the data to the array*/
            return newItem;/*because then the other module,or the other function that's going to call this one can have direct access to the item that we have creted*/
        }
        
    }
    
})();
//UI CONTROLLER
var UIController=(function(){
    var DOMstrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
        
    };
    return{
        getInput:function(){/*the code inside here gets executed immediately and then the object that we return will be assigned to the ui controller and the variable and functions that we defined in the function will stay in the closure even after iife returns.the object that we will return from iife has access to private var and func*/
            return{
                type:document.querySelector(DOMstrings.inputType).value,//will be either inc or exp
                description:document.querySelector(DOMstrings.inputDescription).value,
                value:document.querySelector(DOMstrings.inputValue).value/*we added the value to the type which in the value part of page*/
                /*instead of returning the three variables it would be good to make them the object property and return the object so we will remove var*/
            }
        },
        getDOMstrings:function(){/*bth are the methods of obj*/
        return DOMstrings;/*exposing the private domstring obj to public*/
    }
    }
})();
//GLOBAL APP CONTROLLER
var controller=(function(budgetCtrl,UICntrl){
         var setUpEventListeners=function(){/*function that sets upall the event listeners*/
            var DOM=UICntrl.getDOMstrings();//we are passing one obj to other
               document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem/*called when someone press the addbtn*/);
    
    document.addEventListener('keypress'/*this event occurs when any key is pressed except shift,fn,capslock*/,function(event/*this is going to pass into our event handler by the browser*/){
        /*we want event to happen when user press the enter key not the any key*/
       // console.log(event);/*when we press any button then we are printing the event i.e the object and it has the prototype keyboard event and this one has also the prototype which is the UI event so this means the keyboard event is a UI event and the keyboard object has a property keycode and a number and this number is what identifies the key that we pressed.all the keys have diff keycode*/ 
        /*we are not selecting.we will add this event listener to the global document and thats because this key press event doesnt happen on any specific element but it happe on the global web page*/
    if(event.keycode===13/*enter key*/|| event.which===13/*for older browser which dont have keycode property*/){
        
        ctrlAddItem();
    }
        });
         };
                            
        var ctrlAddItem=function(){//function that gets called when we want to add a new item
        //as soon as someone clicks the button all these happens
        //1.we first need to get the input data
            var input=UICntrl.getInput();
            console.log(input);/*prints an object*/
        
        //2.Add the item to the budget controller
        
        //3.Add the item to the UI
        
        //4.calculate the budget
        
        //5.display the budget on the UI
           
    };
            return{
                init:function(){
                    console.log("application has started");
                    setUpEventListeners();
                }
            }
})(BudgetController,UIController);
    controller.init();