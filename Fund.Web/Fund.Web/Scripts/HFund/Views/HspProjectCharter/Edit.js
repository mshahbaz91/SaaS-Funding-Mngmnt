
function BtnSubmitAction(fundingDetailID) {

    // set field value
    $("#targetFundingDetailID").val(fundingDetailID);
    $("#myModal").modal({ backdrop: false });

}


$(function () {


    $('#LHINSignedDate_fg .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });


    $('#HSPSignedDate_fg .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });

  
    $("#BtnClose").click(function () {
        $("#myModal").modal('hide');
    });




    $("#NoBtn").click(function () {
        $("#myModal").modal('hide');
    });

    $("#YesBtn").click(function () {
        $("#myModal").modal('hide');
        var _FundingDetailID = $("#targetFundingDetailID").val();
        var _Path = "/" + "HspProjectCharter" + "/" + "PC_Submit" + "/" + _FundingDetailID;
        window.location.href = _Path;
    });








    // HSPLeadID ==User Profile ID
    //$('#HSPLeadID').change(function (e) {
    //    e.preventDefault();
    //    $("#HSPLeadEmail").val('');
    //    $("#HSPLeadTelephone").val('');
    //    var UserProfile = { UserProfileID: $('#HSPLeadID').val() };
    //    $.ajax({
    //        url: '/HspProjectCharter/GetUserProfileByID/',
    //        type: 'POST',
    //        data: JSON.stringify(UserProfile),
    //        dataType: 'json',
    //        processData: false,
    //        contentType: 'application/json; charset=utf-8',
    //        success: function (data) {
    //            $("#HSPLeadEmail").val(data.UserEmailID);
    //            $("#HSPLeadTelephone").val(data.UserPhoneNo)
    //        },
    //    });
    //});


    //$('#LHINLeadID').change(function (e) {
    //    e.preventDefault();
    //    $("#LHINLeadEmail").val('');
    //    $("#LHINLeadTelephone").val('');
    //    var UserProfile = { UserProfileID: $('#LHINLeadID').val() };
    //    $.ajax({
    //        url: '/HspProjectCharter/GetUserProfileByID/',
    //        type: 'POST',
    //        data: JSON.stringify(UserProfile),
    //        dataType: 'json',
    //        processData: false,
    //        contentType: 'application/json; charset=utf-8',
    //        success: function (data) { 
    //            $("#LHINLeadEmail").val(data.UserEmailID);
    //            $("#LHINLeadTelephone").val(data.UserPhoneNo)
    //        },
    //    });
    //});










});