$(() => {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    if (!localStorage.frontend_user_profile) {
        $('.show-when-not-logged-in').show()
        $('.show-when-logged-in').hide()
    } else {
        $('.show-when-logged-in').show()
        $('.show-when-not-logged-in').hide()
    }


    // console.log(headerParams);


    populate_profile_modal()
})
// const headerParams = { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('frontend_user_token'))}` };




const populate_profile_modal = () => {
    const { student } = JSON.parse(localStorage.getItem('frontend_user_profile'))


    try {

        $.ajax({
            url: 'http://localhost:3000/students/me',
            type: 'GET',
            data: {},
            beforeSend(req) {
                req.setRequestHeader("Authorization", "Bearer ".concat(JSON.parse(localStorage.getItem('frontend_user_token'))))
            },
            success: function (student) {
                $('#profile_modal_content').append(
                    `<div>
                         <h4 class="has-text-info">${"First Name"}</h4>
                         <p>${student.firstName}</p>
                         ${student.MiddleName || ''}
                         <h4 class="has-text-info">${"Last Name"}</h4>
                         <p>${student.lastName}</p>
                         <h4 class="has-text-info">${"Index Number"}</h4>
                         <p>${student.indexNumber}</p>
                         <h4 class="has-text-info">${"Email Address"}</h4>
                         <p>${student.email}</p>
                         <h4 class="has-text-info">${"Assigned"}</h4>
                         <p>${student.isAllocated == false ? `No` : `Yes`}</p>
                    </div>`
                )
            },
            error: function (e) {
                console.log(e);
            },
        })

    } catch (error) {
        console.log(error);
    }
}





// beforeSend: function(request) {
//     request.setRequestHeader("Authority", authorizationToken),