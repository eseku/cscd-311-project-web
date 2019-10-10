
$(() => {

    if (!localStorage.frontend_user_profile) {
        $('.show-when-not-logged-in').show()
        $('.show-when-logged-in').hide()
    } else {
        $('.show-when-logged-in').show()
        $('.show-when-not-logged-in').hide()
    }

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    populate_profile_modal()
    populate_hall_table()
    tab_link_traversal()
    handleClickRoomsTab()
    handleClickHostelsTab()
    handleRoomsTables()
    handleClickViewHall()
    handleRegisterRoom()
    // modalfunction()
})




function populate_profile_modal() {
    const profile = JSON.parse(localStorage.getItem('frontend_user_profile'))
    try {
        $('#profile_modal_content').html('')
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
    } catch (error) {
        console.log(error);
    }
}


function populate_hall_table() {
    $.get(`http://localhost:3000/hostels`,
        (data, status) => {
            // console.log(data, status)
            if (data) {
                localStorage.setItem('halls', JSON.stringify(data))
            }
        }
    )
    const hostels = JSON.parse(localStorage.getItem('halls'))
    hostels.forEach(element => {
        $('#hostel_table tbody').append(
            `<tr>
                <td>${element.name}</td>
                <td>${element.motto}</td>
                <td>${element.sex}</td>
                <td>${element.numberOfOccupants}</td>
                <td>
                    <button class="button is-info view-rooms">
                        View Rooms
                    </button>
                </td>
            </tr>
            `
        )
    });
}


function tab_link_traversal() {
    $('.tab-link').click(function () {
        $(this).toggleClass('is-active')
        $(this).siblings().removeClass('is-active')
    })
}


function handleClickRoomsTab() {
    $('#tab-link-rooms').click(() => {
        const hostels = JSON.parse(localStorage.getItem('halls'))
        $('#page-content').html('')
        $('#page-content').append(
            `<div class="select is-rounded" id="page-content-rooms-select">
            <select id="halls_select">
            <option>Select Hall<option>
            </select>
        </div>`
        )
        hostels.forEach((hostel) => {
            $('#halls_select').append(`<option value=${hostel._id}>${hostel.name}</option>`)
        })
    })


}

function handleClickHostelsTab() {
    $('#tab-link-hostels').click(() => {
        const hostels = JSON.parse(localStorage.getItem('halls'))
        $('#page-content').html('')
        $('#page-content').append(
            `<div class="table-container" >
            <table class="table is-striped is-hoverable is-fullwidth" id="hostel_table" style="margin-bottom:50px">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Motto</th>
                        <th>Sex</th>
                        <th>Number Of Occupants</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>`
        )
        hostels.forEach(element => {
            $('#hostel_table tbody').append(
                `<tr>
                    <td>${element.name}</td>
                    <td>${element.motto ? element.motto : `unset`}</td>
                    <td>${element.sex ? element.sex : `unset`}</td>
                    <td class="has-text-right">${element.numberOfOccupants}</td>
                    <td>
                        <button class="button is-info view-rooms" id=${element._id}>
                            View Rooms
                        </button>
                    </td>
                </tr>
                `
            )
        });
    })
}


function handleRoomsTables() {
    $('#page-content').on('change', '#halls_select', function () {
        try {
            console.log($(this).val());
            let name = new String
            JSON.parse(localStorage.getItem('halls')).forEach(hall => {
                if (hall._id == $(this).val()) {
                    name = hall.name
                }
            })
            // alert(name)
            $.get(`http://localhost:3000/${$(this).val()}/rooms`,
                (data, status) => {
                    // console.log(data, status)
                    if (data) {
                        data = data.filter((dat) => {
                            return dat.occupied == false
                        })
                        console.log(data);

                        $('#page-content').html('')

                        data.length !== 0 ? $('#page-content').append(
                            `<div class=table-container id=page-content-rooms-table>
                            <h2 class=" is-size-5"><strong>${name}</strong></h2>
                            <table class="table is-striped is-hoverable is-fullwidth" id=rooms_table>
                                <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Occupants</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>`
                        ) : $('#page-content').append(`<p>No Rooms have been created</p>`)

                        data.forEach(room => {
                            $('#rooms_table tbody').append(
                                `<tr>
                                    <td>
                                        ${room.number}
                                    </td>
                                    <td id="room-occupants">
                                        ${room.occupants.length !== 0 ? room.occupants.map(occ => `${occ == JSON.parse(localStorage.getItem('frontend_user_profile'))._id ? `\nYou` : `\n${occ}`}`) : `empty`}
                                    </td>
                                    <td>
                                        <button  id=${room._id} class="register_room button is-primary ">
                                            Register
                                        </button>
                                    </td>
                                </tr>`
                            )
                        })
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    })
}

function handleClickViewHall() {
    $(document).on('click', '.view-rooms', function (e) {
        console.log(e.target.id);
        $('#tab-link-rooms').click()
        $('#halls_select').val(e.target.id).change()

    })
}

function handleRegisterRoom() {
    $(document).on('click', '.register_room', function (e) {
        console.log(e.target.id);

        if (JSON.parse(localStorage.getItem('frontend_user_profile')).isAllocated == true) {
            return toastr.error('You are already assigned to a room', 'Error')
        }

        try {
            // $.post(`http://localhost:3000/${JSON.parse(localStorage.getItem('frontend_user_profile'))._id}/register/${e.target.id}`,
            //     (data, status) => {
            //         console.log(data, status)
            // let psudoHalls = JSON.parse(localStorage.getItem('halls'))
            //         if (data) {
            // localStorage.setItem('frontend_user_profile', JSON.stringify(data.student))
            // psudoHalls.forEach(hall => {
            //     if (hall._id == data.hostel._id) {
            //         hall = data.hostel
            //     }
            //             })
            //             localStorage.setItem('halls', JSON.stringify(psudoHalls))
            //             populate_profile_modal()
            //             modalfunction()
            //             // toastr.success('You have successfully been registered', 'Success')
            //         }
            //     })



            $.ajax({
                url: 'http://localhost:3000/register/'.concat(e.target.id),
                type: 'POST',
                data: {},
                beforeSend(req) {
                    req.setRequestHeader("Authorization", "Bearer ".concat(JSON.parse(localStorage.getItem('frontend_user_token'))))
                },
                success(data) {
                    let psudoHalls = JSON.parse(localStorage.getItem('halls'))
                    localStorage.setItem('frontend_user_profile', JSON.stringify(data.student))
                    let hallApplied = new String
                    psudoHalls.forEach(hall => {
                        if (hall._id == data.hostel._id) {
                            hall = data.hostel
                            hallApplied = hall
                        }
                    })
                    return toastr.success('You have successfully registered for room' + data.room.number + '\n in ' + hallApplied.name, 'Success')
                },
                error(e) {
                    console.log(e);
                }
            })


        } catch (error) {
            console.log(error);
        }
    })
}



