"use strict";

(function () {
    document.addEventListener('DOMContentLoaded', e => {
        e.preventDefault()
        const display = new Display()
        display.checkFields()
        display.hideSubmit()
    })

    document.getElementById('customer-form').addEventListener('submit', e => {
        e.preventDefault()

        const name = document.querySelector('.name');
        const course = document.querySelector('.course');
        const author = document.querySelector('.author');


        const display = new Display()
        const customer = new Customer(name.value, course.value, author.value)

        display.feedback(customer)
        console.log(customer);
    })

    function Display() {
        this.name = document.querySelector('.name');
        this.course = document.querySelector('.course');
        this.author = document.querySelector('.author');
        this.customers = document.querySelector('.customer-list')
    }

    Display.prototype.checkFields = function () {
        this.name.addEventListener('blur', this.validateField)
        this.course.addEventListener('blur', this.validateField)
        this.author.addEventListener('blur', this.validateField)
    }

    Display.prototype.validateField = function () {
        if (this.value === ``) {
            this.classList.remove('complete')
            this.classList.add('fail')
        } else {
            this.classList.add('complete')
            this.classList.remove('fail')
        }

        const complete = document.querySelectorAll('.complete')

        if (complete.length === 3) {
            document.querySelector('.submitBtn').disabled = false
        } else {
            document.querySelector('.submitBtn').disabled = true
        }
    }

    Display.prototype.feedback = function (customer) {

    }

    Display.prototype.hideSubmit = function () {
        const btn = document.querySelector('.submitBtn')
        btn.disabled = true
    }

    function Customer(name, course, author) {
        this.name = name
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
        let random = Math.random() * (max - min) + min
        return random
    }
})();
