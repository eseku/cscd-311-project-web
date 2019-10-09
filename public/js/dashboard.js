$(() => {

    if (!localStorage.frontend_user_profile) {
        $('.show-when-not-logged-in').show()
        $('.show-when-logged-in').hide()
    } else {
        $('.show-when-logged-in').show()
        $('.show-when-not-logged-in').hide()
    }



    populate_profile_modal()
})


const populate_profile_modal = () => {
    const profile = JSON.parse(localStorage.getItem('frontend_user_profile'))
    try {
        $('#profile_modal_content').append(
            `<div>
                 <h4 class="has-text-info">${"First Name"}</h4>
                 <p>${profile.firstName}</p>
                 ${profile.MiddleName || ''}
                 <h4 class="has-text-info">${"Last Name"}</h4>
                 <p>${profile.lastName}</p>
                 <h4 class="has-text-info">${"Index Number"}</h4>
                 <p>${profile.indexNumber}</p>
                 <h4 class="has-text-info">${"Email Address"}</h4>
                 <p>${profile.email}</p>
                 <h4 class="has-text-info">${"Assigned"}</h4>
                 <p>${profile.isAllocated}</p>
            </div>`
        )
        // $.get(`http://localhost:3000/students/${profile._id}`,
        //     (data, status) => {
        //         console.log(data, status)
        //         if (data) {

        //         }
        //     })
    } catch (error) {
        console.log(error);
    }
}