$(function () {

 
    // HSPLeadID ==User Profile ID
    $('#HSPLeadID').change(function (e) {
        e.preventDefault();
        $("#HSPLeadEmail").val('');
        $("#HSPLeadTelephone").val('');
        var UserProfile = { UserProfileID: $('#HSPLeadID').val() };
        $.ajax({
            url: '/AppendixA/GetUserProfileByID/',
            type: 'POST',
            data: JSON.stringify(UserProfile),
            dataType: 'json',
            processData: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                // Single Record // Don't need for for loop 
                $("#HSPLeadEmail").val(data.UserEmailID);
                $("#HSPLeadTelephone").val(data.UserPhoneNo)
            },
        });
    });


    $('#LHINLeadID').change(function (e) {
        e.preventDefault();
        $("#LHINLeadEmail").val('');
        $("#LHINLeadTelephone").val('');
        var UserProfile = { UserProfileID: $('#LHINLeadID').val() };
        $.ajax({
            url: '/AppendixA/GetUserProfileByID/',
            type: 'POST',
            data: JSON.stringify(UserProfile),
            dataType: 'json',
            processData: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                // Single Record // Don't need for for loop 
                $("#LHINLeadEmail").val(data.UserEmailID);
                $("#LHINLeadTelephone").val(data.UserPhoneNo)
            },
        });
    });







});