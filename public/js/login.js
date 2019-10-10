const login = () => {
    if (!$('#index_number_field').val() || !$('#password_field').val()) {
        return toastr.error('Empty Credentials', 'Warning')
    }

    try {
        $.post('http://localhost:3000/students/login', {
            indexNumber: $('#index_number_field').val(),
            password: $('#password_field').val()
        }, (data, status) => {

            console.log(data, status)

            if (!data.error) {
                localStorage.setItem('frontend_user_profile', JSON.stringify(data.student))
                localStorage.setItem('frontend_user_token', JSON.stringify(data.token))
                return window.location.href = 'home.html'
            } else {
                return toastr.error('Authentication Error', 'Error')
            }
        })
    } catch (error) {
        // console.log(error);
        return toastr.error('Authentication Error')
    }
}

$('#login_button').click(() => {

})

$(() => {
    if (localStorage.frontend_user_profile) {
        console.log(localStorage.frontend_user_profile);
        return window.location.href = 'home.html'
    }

    $('#login_button').click(() => {
        login()
    })

    $('#index_number_field, #password_field').keydown((event) => {
        event.which == 13 && login()
    })

    $.get(`http://localhost:3000/hostels`,
        (data, status) => {
            // console.log(data, status)
            if (data) {
                localStorage.setItem('halls', JSON.stringify(data))
            }
        }
    )

})

