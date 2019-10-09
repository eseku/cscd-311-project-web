// $('#email_field').on('keyup', function () {
//     console.log($(this).val());
// })

console.log($('.passwords').children()[2])

$('#password_field').on('keyup', function () {
    $(this).addClass('is-primary')
})


$('#confirm_password_field').on('keyup', function () {
    if ($(this).val() != $('#password_field').val()) {
        $(this).addClass('is-danger')
        $('#password_field').removeClass('is-primary').addClass('is-danger')
    } else {
        $('#password_field').removeClass('is-danger').addClass('is-primary')
        $(this).removeClass('is-danger').addClass('is-primary')
    }
})


$('#confirm_password_field, #password_field').on('keyup', function () {
    if ($('#password_field').val() == $('#confirm_password_field').val()) {
        return $('#password_field, #confirm_password_field').removeClass('is-danger').addClass('is-primary')
    }

    if ($('#password_field').val() != $('#confirm_password_field').val()) {
        $('#password_field, #confirm_password_field').removeClass('is-primary').addClass('is-danger')
        $('.passwords').children()[2].removeClass('is-primary').addClass('is-danger')
        $('.passwords').children()[2].text('Passwords must match')
    }

})


$('#signup_button').on('click', function () {
    const signup_data = validate()
    if (!signup_data) {
        return toastr.error('error')
    }
    register(signup_data)
})


const validate = () => {
    if (!$('#first_name_field').val() || !$('#last_name_field').val() || !$('#email_field').val() || !$('#password_field').val() || !$('#confirm_password_field').val()) {
        return toastr.error('Fill in all required fields', 'Error')
    }

    if ($('#confirm_password_field').val() != $('#password_field').val()) {
        return toastr.error('Passwords must match', 'Error')
    }

    let obj = {
        firstName: $('#first_name_field').val(),
        lastName: $('#last_name_field').val(),
        email: $('#email_field').val()
    }

    if ($('#middle_name_field').val()) {
        obj.middleName = $('#middle_name_field').val()
    }

    if ($('#confirm_password_field').val() === $('#password_field').val()) {
        obj.password = $('#confirm_password_field').val()
    }

    return obj
}


const register = (object) => {
    try {
        $.post('http://localhost:3000/students',
            object,
            (data, status) => {
                if (data.error) {
                    return toastr.error(data.error, 'Error')
                }
                localStorage.setItem('frontend_user_profile', JSON.stringify(data))
                window.location.href = 'home.html'
            })
    } catch (error) {
        console.log(error);
    }
}