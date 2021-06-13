"use strict";
//IIFE
(function () {
    document.addEventListener('DOMContentLoaded', e => { //on load
        e.preventDefault()
        const display = new Display() //create new Display
        display.checkFields() //check if fields are filled in
        display.hideSubmit() //disable the submit button automatically
    })

    document.getElementById('customer-form').addEventListener('submit', e => {
        e.preventDefault()

        const name = document.querySelector('.name');
        const course = document.querySelector('.course');
        const author = document.querySelector('.author');


        const display = new Display()
        const customer = new Customer(name.value, course.value, author.value)

        display.feedback(customer) //pass in NEW customer to display.proto.feedback
        display.clearFields()
        console.log(customer);
    })

    function Display() { //new display is created here
        this.name = document.querySelector('.name'); //this refers to Display, and pulls value from DOM
        this.course = document.querySelector('.course');
        this.author = document.querySelector('.author');
        this.customers = document.querySelector('.customer-list')
    }

    Display.prototype.checkFields = function () {
        this.name.addEventListener('blur', this.validateField) //Display = this... add listener to validate field when we click into box
        this.course.addEventListener('blur', this.validateField)
        this.author.addEventListener('blur', this.validateField)
    }

    Display.prototype.validateField = function () { //this = Display
        if (this.value === ``) { //checks if value is empty
            this.classList.remove('complete') //remove complete
            this.classList.add('fail') // add in new class of fail
        } else { //if not empty
            this.classList.add('complete')
            this.classList.remove('fail')
        }

        const complete = document.querySelectorAll('.complete') //checks all items in DOM for a class name of complete

        if (complete.length === 3) { //if there are three classes "complete", we can proceed
            document.querySelector('.submitBtn').disabled = false
        } else {
            document.querySelector('.submitBtn').disabled = true
        }
    }

    //struggled with the this keyword on the prototype
    Display.prototype.feedback = function (customer) {
        const feedback = document.querySelector('.feedback')
        const loading = document.querySelector('.loading')

        feedback.classList.add('showItem', 'alert', 'alert-success')
        loading.classList.add('showItem')

        const self = this //need to use self due to clojures (need to research more)
        this.hideSubmit()
        //console.log(this);
        setTimeout(function () {
            feedback.classList.remove('showItem', 'alert', 'alert-success')
            loading.classList.remove('showItem')
            console.log(this); //pointing to the window object if you use this and not self
            console.log(self); //pointing to display class
            self.addCustomer(customer)
        }, 3000) //after 3 seconds perform removal of classes
        //console.log(this);
    }

    Display.prototype.hideSubmit = function () {
        const btn = document.querySelector('.submitBtn')
        btn.disabled = true
    }

    function Customer(name, course, author) { //create new customer
        this.name = name //this points to customer
        this.course = course
        this.author = author
    }

    Display.prototype.addCustomer = function (customer) {
        const random = this.getRandom()
        const div = document.createElement('div')
        div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-4')
        div.innerHTML = `
        <div class="card text-left">
            <img src="./img/cust-${random}.jpg" class="card-img-top" alt="">
                <div class="card-body">
        <!-- customer name -->
                    <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${customer.name}</span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
                    <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
          ${customer.course}
                    </span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
                <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author">${customer.author}</span></h6>
        <!-- end of customer name -->
                </div>
      </div>
        `
        //const customerList = document.querySelector('.customer-list')
        this.customers.appendChild(div)
    }

    Display.prototype.getRandom = function () {
        let random = Math.floor(Math.random() * 5 + 1)
        return random
    }

    Display.prototype.clearFields = function () {
        this.name.value = ``
        this.author.value = ``
        this.course.value = ``

        this.name.classList.remove('complete', 'fail');
        this.course.classList.remove('complete', 'fail');
        this.author.classList.remove('complete', 'fail');
    }
})();
