var _tRow_Name_Prefix = "Row_Name";
var _tRow_HspTextId_Prefix = "Row_HspTextId";
var _tRow_HspValueId_Prefix = "Row_HspValueId";
var _tRow_FiscalYearValueId_Prefix = "Row_FiscalYearValueId";
var _tRow_ProgramValueId_Prefix = "Row_ProgramValueId";
var _tRow_SectorTextId_Prefix = "Row_SectorTextId";
var _tRow_SectorValueId_Prefix = "Row_SectorValueId";
var _tRow_TclhinLeadValueId_Prefix = "Row_TclhinLeadValueId";
var _tRow_TpbeTextId_Prefix = "Row_TpbeTextId";
var _tRow_TpbeValueId_Prefix = "Row_TpbeValueId";
var _tRow_FundingTypeOneTextId_Prefix = "Row_FundingTypeOneTextId";
var _tRow_FundingTypeOneValueId_Prefix = "Row_FundingTypeOneValueId";
var _tRow_FundingTypeOneAmountValueId_Prefix = "Row_FundingTypeOneAmountValueId";
var _tRow_FundingTypeTwoTextId_Prefix = "Row_FundingTypeTwoTextId";
var _tRow_FundingTypeTwoValueId_Prefix = "Row_FundingTypeTwoValueId";
var _tRow_FundingTypeTwoAmountValueId_Prefix = "Row_FundingTypeTwoAmountValueId";
var _tRow_DeliverableValueId_Prefix = "Row_DeliverableValueId";
var _tRow_EnclosureValueId_Prefix = "Row_EnclosureValueId";
var _tRow_BaseAnnualizedAmountValueId_Prefix = "Row_BaseAnnualizedAmountValueId";
var _tRow_AdditionalCommentOneValueId_Prefix = "Row_AdditionalCommentOneValueId";
var _tRow_AdditionalCommentTwoValueId_Prefix = "Row_AdditionalCommentTwoValueId";

var _gIsReferenceNoUnique = false;

$(function () {

    var _firstTpbeId = null;

   
    $('.input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true
        });


    $(".touchspin3").TouchSpin({
            verticalbuttons: true,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white'
        });


    $("#FS_Deliverable_Row").hide();

    $("#errorTB").hide();



    $('#FiscalYear').change(function (e) {
        e.preventDefault();
        $("#FS_Table > tbody:last").children().remove();
    });


    
    $('#FS_FiscalYear').change(function (e) {
        e.preventDefault();
        var FiscalYear = { FiscalYear1: $('#FS_FiscalYear').val() };
        $.ajax({
            url: '/api/ProgramApi/GetProgramByFiscalYear/',
            type: 'POST',
            data: JSON.stringify(FiscalYear),
            dataType: 'json',
            processData: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#FS_ProgramID').empty();
                $('#FS_ProgramID').append("<option value=''> Select ... </option>");
                for (var i = 0 ; i < data.length; i++) {
                    $('#FS_ProgramID').append("<option value='" + data[i].programID + "'>" + data[i].programDescription + "</option>");
                }
            },
        });

    });
    


    $('#FS_HSPID').change(function (e) {
        e.preventDefault();
        var _accountId_Value = $('#FS_HSPID').val() ;
        $('#FS_SectorID').empty();
         $('#FS_TPBEID').empty();
        $.ajax({
            url: '/api/AccountTPBEApi/GetSectors_ByAccountId/',
            type: 'POST',
            data: JSON.stringify({accountId: _accountId_Value } ),
            dataType: 'json',
            processData: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#FS_SectorID').append("<option value=''> Select ... </option>");
                for (var i = 0 ; i < data.length; i++) {
                    $('#FS_SectorID').append("<option value='" + data[i].sectorId + "'>" + data[i].shortDescription + "</option>");
                }
            },
        });

    });



    $('#FS_SectorID').change(function (e) {
        e.preventDefault();
        $('#FS_TPBEID').empty();
        var _sectorId_Value = $('#FS_SectorID').val();
        var _accountId_Value = $('#FS_HSPID').val();
        $.ajax({
            url: '/api/TPBEApi/GetTPBEs_BySectorId/',
            type: 'POST',
            data: JSON.stringify({ sectorId: _sectorId_Value, accountId: _accountId_Value }),
            dataType: 'json',
            processData: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#FS_TPBEID').append("<option value=''> Select ... </option>");
                for (var i = 0 ; i < data.length; i++) {
                    $('#FS_TPBEID').append("<option value='" + data[i].tpbeId + "'>" + data[i].tpbeDescription + "</option>");
                }
            },
        });

    });



    $("#FundingSource_CloseBtn").click(function () {
        $("#FundingSourceModal").modal('hide');
    });



    $("#FundingSource_AddBtn").click(function () {

        // clear the last action left 
        $("#FS_TargetMessage").html('');
        $("#FS_TargetMessage").removeClass("text-danger");
        $("#FS_TargetMessage").removeClass("text-success");

        $("#FS_Name").val('');
        $("#FS_Name").css('border-color', '');

        $("#FS_FiscalYear").val('');
        $("#FS_FiscalYear").css('border-color', '');

        $('#FS_ProgramID').empty();
        $('#FS_ProgramID').append("<option value=''>Select ... </option>");
        $("#FS_ProgramID").css('border-color', '');

        $("#FS_SectorID").val('');
        $("#FS_SectorID").css('border-color', '');

        $("#FS_TCLHINLeadID").val('');
        $("#FS_TCLHINLeadID").css('border-color', '');

        $("#FS_HSPID").val('');
        $("#FS_HSPID").css('border-color', '');

        $("#FS_TPBEID").val('');
        $("#FS_TPBEID").css('border-color', '');

        $("#FS_FundingTypeOne").val('');
        $("#FS_FundingTypeOne").css('border-color', '');

        $("#FS_FundingTypeOneAmount").val('');
        $("#FS_FundingTypeOneAmount").css('border-color', '');

        $("#FS_FundingTypeTwo").val('');
        $("#FS_FundingTypeTwo").css('border-color', '');

        $("#FS_FundingTypeTwoAmount").val('');
        $("#FS_FundingTypeTwoAmount").css('border-color', '');

        $("#FS_Deliverable").val('');
        $("#FS_Deliverable").css('border-color', '');

        $("#FS_Enclosure").val('');
        $("#FS_Enclosure").css('border-color', '');

        $("#FS_BaseAnnualizedAmount").val('');
        $("#FS_BaseAnnualizedAmount").css('border-color', '');

        $("#FS_AdditionalCommentOne").val('');
        $("#FS_AdditionalCommentOne").css('border-color', '');

        $("#FS_AdditionalCommentTwo").val('');
        $("#FS_AdditionalCommentTwo").css('border-color', '');


        var _LastRowId = 0;
        var _TotalRows = $("#FS_Table  tbody  tr").length;
        if (_TotalRows != 0 || _TotalRows != "0")
        {
            _LastRowId = $('#FS_Table > tbody tr:last').attr("id");

            // Copy last row value 
            var _Row_NameId = _tRow_Name_Prefix  + _LastRowId;
            var _Row_HspTextId = _tRow_HspTextId_Prefix + _LastRowId;
            var _Row_HspValueId = _tRow_HspValueId_Prefix + _LastRowId;
            var _Row_FiscalYearValueId = _tRow_FiscalYearValueId_Prefix + _LastRowId;
            var _Row_ProgramValueId =  _tRow_ProgramValueId_Prefix + _LastRowId;
            var _Row_SectorValueId = _tRow_SectorValueId_Prefix + _LastRowId;
            var _Row_TclhinLeadValueId = _tRow_TclhinLeadValueId_Prefix + _LastRowId;
            var _Row_TpbeValueId = _tRow_TpbeValueId_Prefix + _LastRowId;
            var _Row_FundingTypeOneTextId = _tRow_FundingTypeOneTextId_Prefix + _LastRowId;
            var _Row_FundingTypeOneValueId = _tRow_FundingTypeOneValueId_Prefix + _LastRowId;
            var _Row_FundingTypeOneAmountValueId = _tRow_FundingTypeOneAmountValueId_Prefix + _LastRowId;
            var _Row_FundingTypeTwoTextId =  _tRow_FundingTypeTwoTextId_Prefix + _LastRowId;
            var _Row_FundingTypeTwoValueId = _tRow_FundingTypeTwoValueId_Prefix + _LastRowId;
            var _Row_FundingTypeTwoAmountValueId = _tRow_FundingTypeTwoAmountValueId_Prefix + _LastRowId;
            var _Row_DeliverableValueId = _tRow_DeliverableValueId_Prefix + _LastRowId;
            var _Row_EnclosureValueId = _tRow_EnclosureValueId_Prefix + _LastRowId;
            var _Row_BaseAnnaulizedAmountValueId = _tRow_BaseAnnualizedAmountValueId_Prefix + _LastRowId;
            var _Row_AdditionalCommentOneId = _tRow_AdditionalCommentOneValueId_Prefix + _LastRowId;
            var _Row_AdditionalCommentTwoId = _tRow_AdditionalCommentTwoValueId_Prefix + _LastRowId;
           
            // Get last row fields value
            var _FS_Name = $("#" + _Row_NameId).val();
            var _FS_HSPID = $("#" + _Row_HspValueId).val();
            var _FS_FundingTypeOne = $("#" + _Row_FundingTypeOneValueId).val();
            var _FS_FundingTypeOneAmount = $("#" + _Row_FundingTypeOneAmountValueId).text();
            var _FS_FiscalYear = $("#" + _Row_FiscalYearValueId).val();
            var _FS_ProgramID = $("#" + _Row_ProgramValueId).val();
            var _FS_SectorID = $("#" + _Row_SectorValueId).val();
            var _FS_TCLHINLeadID = $("#" + _Row_TclhinLeadValueId).val();
            var _FS_TPBEID = $("#" + _Row_TpbeValueId).val();
            var _FS_FundingTypeTwo = $("#" + _Row_FundingTypeTwoValueId).val();
            var _FS_FundingTypeTwoAmount = $("#" + _Row_FundingTypeTwoAmountValueId).val();
            var _FS_Deliverable = $("#" + _Row_DeliverableValueId).val();
            var _FS_Enclosure = $("#" + _Row_EnclosureValueId).val();
            var _FS_BaseAnnualizedAmount = $("#" + _Row_BaseAnnaulizedAmountValueId).val();
            var _FS_AdditionalCommentOne = $("#" + _Row_AdditionalCommentOneId).val();
            var _FS_AdditionalCommentTwo = $("#" + _Row_AdditionalCommentTwoId).val();

            // Modal Dialog Fields Value
            // First Column
            $("#FS_Name").val(_FS_Name);
            $("#FS_HSPID").val(_FS_HSPID);
         
            // Second Column
            $("#FS_FundingTypeOne").val(_FS_FundingTypeOne);
            $("#FS_FiscalYear").val(_FS_FiscalYear);
            $("#FS_ProgramID").val(_FS_ProgramID);
            $("#FS_SectorID").val(_FS_SectorID);
            $("#FS_TCLHINLeadID").val(_FS_TCLHINLeadID);
            $("#FS_TPBEID").val(_FS_TPBEID);

            // Third Column
            $("#FS_FundingTypeOneAmount").val(_FS_FundingTypeOneAmount);
            // Fourth Column
            $("#FS_Deliverable").val(_FS_Deliverable);

            $("#FS_FundingTypeTwo").val(_FS_FundingTypeTwo);
            $("#FS_FundingTypeTwoAmount").val(_FS_FundingTypeTwoAmount);

            $("#FS_Enclosure").val(_FS_Enclosure);
            $("#FS_BaseAnnualizedAmount").val(_FS_BaseAnnualizedAmount);
            $("#FS_AdditionalCommentOne").val(_FS_AdditionalCommentOne);
            $("#FS_AdditionalCommentTwo").val(_FS_AdditionalCommentTwo);

            RefreshProgramID(_FS_FiscalYear, _FS_ProgramID);

        }
        else
        {
            // By default get from  AdminLetter Level
            var _FS_Name = $("#Name").val();
            $("#FS_Name").val(_FS_Name);

            var _FS_FiscalYear = $("#FiscalYear").val();
            $("#FS_FiscalYear").val(_FS_FiscalYear);

            var _FS_TCLHINLeadId = $("#TCLHINLeadId").val();
            $("#FS_TCLHINLeadID").val(_FS_TCLHINLeadId);

            RefreshProgramID(_FS_FiscalYear, '');

        }


        $("#FS_AddBtn").show();
        $("#FS_SaveBtn").hide();
        $("#FundingSourceModal").modal({ backdrop: false });
    });



    $("#FS_AddBtn").click(function () {

        // clean last click left
        $("#FS_TargetMessage").html('');
        $("#FS_TargetMessage").removeClass("text-danger");
        $("#FS_TargetMessage").removeClass("text-info");
        $("#FS_Name").css('border-color', '');
        $("#FS_FiscalYear").css('border-color', '');
        $("#FS_ProgramID").css('border-color', '');
        $("#FS_SectorID").css('border-color', '');
        $("#FS_TCLHINLeadID").css('border-color', '');
        $("#FS_HSPID").css('border-color', '');
        $("#FS_TPBEID").css('border-color', '');
        $("#FS_FundingTypeOne").css('border-color', '');
        $("#FS_FundingTypeOneAmount").css('border-color', '');
        $("#FS_Deliverable").css('border-color', '');
        $("#FS_FundingTypeTwo").css('border-color', '');
        $("#FS_FundingTypeTwoAmount").css('border-color', '');
        $("#FS_BaseAnnualizedAmount").css('border-color', '');

        // Validation first 
        var _FS_Name= $('#FS_Name').val();
        if (_FS_Name == '' || _FS_Name == null) {
            $("#FS_Name").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please enter Name  ...");
            return;
        }

        var _FS_FiscalYear = $('#FS_FiscalYear').val();
        if (_FS_FiscalYear == '' || _FS_FiscalYear == null) {
            $("#FS_FiscalYear").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Fiscal Year  ...");
            return;
        }

      
        var _FS_ProgramID = $('#FS_ProgramID').val();
       
        var _FS_SectorID = $('#FS_SectorID').val();
        if (_FS_SectorID == '' || _FS_SectorID == null) {
            $("#FS_SectorID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Sector  ...");
            return;
        }


        var _FS_TCLHINLeadID = $('#FS_TCLHINLeadID').val();
        if (_FS_TCLHINLeadID == '' || _FS_TCLHINLeadID == null) {
            $("#FS_TCLHINLeadID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select LHIN Lead  ...");
            return;
        }


        var _FS_HSPID = $('#FS_HSPID').val();
        if (_FS_HSPID == '' || _FS_HSPID == null) {
            $("#FS_HSPID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select HSP  ...");
            return;
        }


        var _FS_TPBEID = $('#FS_TPBEID').val();
        if (_FS_TPBEID == '' || _FS_TPBEID == null) {
            $("#FS_TPBEID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select TPBE  ...");
            return;
        }


        var _FS_FundingTypeOne = $('#FS_FundingTypeOne').val();
        if (_FS_FundingTypeOne == '' || _FS_FundingTypeOne == null) {
            $("#FS_FundingTypeOne").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Funding Type 1  ...");
            return;
        }


        var _FS_FundingTypeOneAmount = $('#FS_FundingTypeOneAmount').val();
        if (_FS_FundingTypeOneAmount == '' || _FS_FundingTypeOneAmount == null) {
            $("#FS_FundingTypeOneAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Funding Type 1 ...");
            return;
        }

        if (IsValidNegativeCurrencyFormat(_FS_FundingTypeOneAmount) == false) {
            $("#FS_FundingTypeOneAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please fill in valid Amount ...");
            return;
        }
        else
        {
            if (tclhinIsZeroValueEntered(_FS_FundingTypeOneAmount) == true) {
                $("#FS_FundingTypeOneAmount").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Funding Type 1 amount must great than zero ...");
                return;
            } 
        }

      
        //  FS_FundingType2  can not duplicate FS_FundingType
        var _FS_FundingTypeTwo = $('#FS_FundingTypeTwo').val();
        if (_FS_FundingTypeTwo != '' && _FS_FundingTypeTwo != null) {
            if (_FS_FundingTypeOne == _FS_FundingTypeTwo)
            {
                // alert(_FS_FundingTypeTwo);
                $("#FS_FundingTypeTwo").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Funding Type 2 can not same as Funding Type 1  ...");
                return;
            }
        }

        
        var _FS_FundingTypeTwoAmount = $('#FS_FundingTypeTwoAmount').val();
        if (_FS_FundingTypeTwoAmount != '' &&  _FS_FundingTypeTwoAmount != null)
        {
            if (IsValidNegativeCurrencyFormat(_FS_FundingTypeTwoAmount) == false) {
                $("#FS_FundingTypeTwoAmount").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Please fill in valid Amount ...");
                return;
            }
            else
            {
                if (tclhinIsZeroValueEntered(_FS_FundingTypeTwoAmount) == true) {
                    $("#FS_FundingTypeTwoAmount").css('border-color', 'red');
                    $("#FS_TargetMessage").addClass("text-danger");
                    $("#FS_TargetMessage").html("Funding Type 2 Amount must great than zero ...");
                    return;
                }
                else
                {

                    if (_FS_FundingTypeTwo == '' || _FS_FundingTypeTwo == null)
                    {
                        $("#FS_FundingTypeTwo").css('border-color', 'red');
                        $("#FS_TargetMessage").addClass("text-danger");
                        $("#FS_TargetMessage").html("Please select Funding Type 2  ...");
                        return;
                    }
                }
            }
        }

        // make sure funding type 2 has value must have amount
        if ( (_FS_FundingTypeTwo != '' && _FS_FundingTypeTwo != null) && (_FS_FundingTypeTwoAmount == '' || _FS_FundingTypeTwoAmount == null))
        {
            $("#FS_FundingTypeTwoAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please fill in valid Amount ...");
            return;
        }


        var _FS_Deliverable = $('#FS_Deliverable').val();
        var _FS_Enclosure = $('#FS_Enclosure').val();
        // FS_BaseAnnualizedAmount
        var _FS_AdditionalCommentOne = $('#FS_AdditionalCommentOne').val();
        var _FS_AdditionalCommentTwo = $('#FS_AdditionalCommentTwo').val();

        var _FS_BaseAnnualizedAmount = $('#FS_BaseAnnualizedAmount').val();
        if (IsValidNegativeCurrencyFormat(_FS_BaseAnnualizedAmount) == false)
        {
            $("#FS_BaseAnnualizedAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please fill in valid Amount ...");
            return;
        }
        else
        {
            if (tclhinIsZeroValueEntered(_FS_BaseAnnualizedAmount) == true)
            {
                $("#FS_BaseAnnualizedAmount").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Must great than zero ...");
                return;
            }

        }
       

        // var _FundingEntityStatusIDText = $("#FundingEntityStatusID option:selected").text();
        var _FS_FiscalYearText = $("#FS_FiscalYear option:selected").text();
        var _FS_ProgramIDText = $("#FS_ProgramID option:selected").text();
        var _FS_TCLHINLeadIDText = $("#FS_TCLHINLeadID option:selected").text();
        var _FS_HSPIDText = $("#FS_HSPID option:selected").text();
        var _FS_FundingTypeOneText = $("#FS_FundingTypeOne option:selected").text();
        var _FS_FundingTypeTwoText = $("#FS_FundingTypeTwo option:selected").text();

        var _FS_TPBEIDText = $("#FS_TPBEID option:selected").text();
        var _FS_SectorIDText = $("#FS_SectorID option:selected").text();

        var _NextRowId = 0;
        var _TotalRows = $("#FS_Table  tbody  tr").length;
     
        if (_TotalRows == 0 || _TotalRows == "0")
        {
            _NextRowId = 1;
        } else {
            var _LastRowId = $('#FS_Table > tbody tr:last').attr("id");
            _NextRowId =  parseInt(_LastRowId) + 1;
        }

        // console.log("Next Row Id : " + _NextRowId);
        var _Row_NameId = _tRow_Name_Prefix + _NextRowId;
        var _Row_HspTextId = _tRow_HspTextId_Prefix + _NextRowId;
        var _Row_HspValueId =   _tRow_HspValueId_Prefix + _NextRowId;
        var _Row_FiscalYearValueId = _tRow_FiscalYearValueId_Prefix + _NextRowId;
        var _Row_ProgramValueId = _tRow_ProgramValueId_Prefix + _NextRowId;
        var _Row_TclhinLeadValueId = _tRow_TclhinLeadValueId_Prefix  + _NextRowId;
        var _Row_TpbeTextId = _tRow_TpbeTextId_Prefix + _NextRowId;
        var _Row_TpbeValueId = _tRow_TpbeValueId_Prefix + _NextRowId;
        var _Row_SectorTextId = _tRow_SectorTextId_Prefix + _NextRowId;
        var _Row_SectorValueId = _tRow_SectorValueId_Prefix + _NextRowId;
        var _Row_FundingTypeOneTextId = _tRow_FundingTypeOneTextId_Prefix + _NextRowId;
        var _Row_FundingTypeOneValueId = _tRow_FundingTypeOneValueId_Prefix + _NextRowId;
        var _Row_FundingTypeOneAmountValueId = _tRow_FundingTypeOneAmountValueId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoTextId =  _tRow_FundingTypeTwoTextId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoValueId = _tRow_FundingTypeTwoValueId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoAmountValueId = _tRow_FundingTypeTwoAmountValueId_Prefix + _NextRowId;
        var _Row_DeliverableValueId = _tRow_DeliverableValueId_Prefix + _NextRowId;
        var _Row_EnclosureValueId = _tRow_EnclosureValueId_Prefix + _NextRowId;
        var _Row_BaseAnnualizedAmountId = _tRow_BaseAnnualizedAmountValueId_Prefix + _NextRowId;
        var _Row_AdditionalCommentOneId = _tRow_AdditionalCommentOneValueId_Prefix + _NextRowId;
        var _Row_AdditionalCommentTwoId = _tRow_AdditionalCommentTwoValueId_Prefix + _NextRowId;

        var _NewRowContent = "<tr id=\"" + _NextRowId + "\" > " + 
                             "<td><span id=\"" + _Row_HspTextId + "\" ></span> <input type=\"hidden\" id=\"" + _Row_HspValueId + "\">  <input type=\"hidden\" id=\"" + _Row_NameId + "\"> </td>" +
                             "<td>" + "<span id=\"" + _Row_FundingTypeOneTextId + "\"></span> "
                                    + "<input type=\"hidden\" id=\"" + _Row_FundingTypeOneValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_FiscalYearValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_ProgramValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_SectorValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_SectorTextId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_TclhinLeadValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_TpbeTextId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_TpbeValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_FundingTypeTwoTextId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_FundingTypeTwoValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_FundingTypeTwoAmountValueId + "\">"
                                    + "<input type=\"hidden\" id=\"" + _Row_DeliverableValueId + "\">"
                                    +
                            "</td>" +
                            "<td>"  + "<span id=\"" + _Row_FundingTypeOneAmountValueId + "\" > </span>"
                                    + "<input type=\"hidden\" id=\"" + _Row_EnclosureValueId + "\">" 
                                    + "<input type=\"hidden\" id=\"" + _Row_BaseAnnualizedAmountId + "\">" 
                                    + "<input type=\"hidden\" id=\"" + _Row_AdditionalCommentOneId + "\">" 
                                    + "<input type=\"hidden\" id=\"" + _Row_AdditionalCommentTwoId + "\">" +
                            "</td>" +
                             "<td><input type=\"button\" class=\"btn btn-info\" value=\"Edit\" onClick=\"EditRow(" + _NextRowId + ")\"></td>" +
                             "<td><input type=\"button\" class=\"btn btn-danger\" value=\"Delete\" onClick=\"DeleteRow(" + _NextRowId + ")\"></td>" +
                             "</tr>";

     

        $('#FS_Table > tbody:last').append(_NewRowContent);

        // First Column
        $("#" + _Row_NameId).val(_FS_Name);
        $("#" + _Row_HspTextId).text(_FS_HSPIDText);
        $("#" + _Row_HspValueId).val(_FS_HSPID);

        // Second Column
        $("#" + _Row_FundingTypeOneTextId).text(_FS_FundingTypeOneText);
        $("#" + _Row_FundingTypeOneValueId).val(_FS_FundingTypeOne);
        $("#" + _Row_FiscalYearValueId).val(_FS_FiscalYear);
        $("#" + _Row_ProgramValueId).val(_FS_ProgramID);
        $("#" + _Row_SectorValueId).val(_FS_SectorID);
        $("#" + _Row_SectorTextId).val(_FS_SectorIDText);
        $("#" + _Row_TclhinLeadValueId).val(_FS_TCLHINLeadID);
        $("#" + _Row_TpbeTextId).val(_FS_TPBEIDText);
        $("#" + _Row_TpbeValueId).val(_FS_TPBEID);
        $("#" + _Row_FundingTypeTwoTextId).text(_FS_FundingTypeTwoText);
        $("#" + _Row_FundingTypeTwoValueId).val(_FS_FundingTypeTwo);
        $("#" + _Row_FundingTypeTwoAmountValueId).val(_FS_FundingTypeTwoAmount);
        $("#" + _Row_DeliverableValueId).val(_FS_Deliverable);

        // Third Column
        $("#" + _Row_FundingTypeOneAmountValueId).text(_FS_FundingTypeOneAmount);
        $("#" + _Row_EnclosureValueId).val(_FS_Enclosure);
        $("#" + _Row_BaseAnnualizedAmountId).val(_FS_BaseAnnualizedAmount);
        $("#" + _Row_AdditionalCommentOneId).val(_FS_AdditionalCommentOne);
        $("#" + _Row_AdditionalCommentTwoId).val(_FS_AdditionalCommentTwo);

        // Fourth Column
        $("#FS_TargetMessage").html('Save new  record successfully .');
        $("#FS_TargetMessage").removeClass("text-primary");
        $("#FS_AddBtn").hide();

    });



    $("#FS_SaveBtn").click(function () {

        // clean last click left
        $("#FS_TargetMessage").html('');
        $("#FS_TargetMessage").removeClass("text-danger");
        $("#FS_TargetMessage").removeClass("text-success");
        $("#FS_Name").css('border-color', '');
        $("#FS_FiscalYear").css('border-color', '');
        $("#FS_ProgramID").css('border-color', '');
        $("#FS_SectorID").css('border-color', '');
        $("#FS_TCLHINLeadID").css('border-color', '');
        $("#FS_HSPID").css('border-color', '');
        $("#FS_TPBEID").css('border-color', '');
        $("#FS_FundingTypeOne").css('border-color', '');
        $("#FS_FundingTypeOneAmount").css('border-color', '');
        $("#FS_Deliverable").css('border-color', '');
        $("#FS_FundingTypeTwo").css('border-color', '');
        $("#FS_FundingTypeTwoAmount").css('border-color', '');
        $("#FS_BaseAnnualizedAmount").css('border-color', '');

        // Validation first 
        var _FS_Name = $('#FS_Name').val();
        if (_FS_Name == '' || _FS_Name == null) {
            $("#FS_Name").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please enter Name  ...");
            return;
        }

        var _FS_FiscalYear = $('#FS_FiscalYear').val();
        if (_FS_FiscalYear == '' || _FS_FiscalYear == null) {
            $("#FS_FiscalYear").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Fiscal Year  ...");
            return;
        }

      
        var _FS_ProgramID = $('#FS_ProgramID').val();
      

        var _FS_SectorID = $('#FS_SectorID').val();
        if (_FS_SectorID == '' || _FS_SectorID == null) {
            $("#FS_SectorID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Sector  ...");
            return;
        }


        var _FS_TCLHINLeadID = $('#FS_TCLHINLeadID').val();
        if (_FS_TCLHINLeadID == '' || _FS_TCLHINLeadID == null) {
            $("#FS_TCLHINLeadID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select LHIN Lead  ...");
            return;
        }


        var _FS_HSPID = $('#FS_HSPID').val();
        if (_FS_HSPID == '' || _FS_HSPID == null) {
            $("#FS_HSPID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select HSP  ...");
            return;
        }


        var _FS_TPBEID = $('#FS_TPBEID').val();
        if (_FS_TPBEID == '' || _FS_TPBEID == null) {
            $("#FS_TPBEID").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select TPBE  ...");
            return;
        }


        var _FS_FundingTypeOne = $('#FS_FundingTypeOne').val();
        if (_FS_FundingTypeOne == '' || _FS_FundingTypeOne == null) {
            $("#FS_FundingTypeOne").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Funding Type 1  ...");
            return;
        }


        var _FS_FundingTypeOneAmount = $('#FS_FundingTypeOneAmount').val();
        if (_FS_FundingTypeOneAmount == '' || _FS_FundingTypeOneAmount == null) {
            $("#FS_FundingTypeOneAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please select Funding Type 1 Amount ...");
            return;
        }

        if (IsValidNegativeCurrencyFormat(_FS_FundingTypeOneAmount) == false) {
            $("#FS_FundingTypeOneAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please fill in valid Amount ...");
            return;
        }
        else
        {
            if (tclhinIsZeroValueEntered(_FS_FundingTypeOneAmount) == true) {
                $("#FS_FundingTypeOneAmount").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Funding Type 1 amount must great than zero ...");
                return;
            }
        }


        //  FS_FundingType2  can not duplicate FS_FundingType
        var _FS_FundingTypeTwo = $('#FS_FundingTypeTwo').val();
        if (_FS_FundingTypeTwo != '' && _FS_FundingTypeTwo != null) {
            if (_FS_FundingTypeOne == _FS_FundingTypeTwo) {
                $("#FS_FundingTypeTwo").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Funding Type 2 can not same as Funding Type 1  ...");
                return;
            }
        }

        var _FS_FundingTypeTwoAmount = $('#FS_FundingTypeTwoAmount').val();
        if (_FS_FundingTypeTwoAmount != '' && _FS_FundingTypeTwoAmount != null) {
            if (IsValidNegativeCurrencyFormat(_FS_FundingTypeTwoAmount) == false) {
                $("#FS_FundingTypeTwoAmount").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Please fill in valid Amount ...");
                return;
            }
            else
            {
                if (tclhinIsZeroValueEntered(_FS_FundingTypeTwoAmount) == true) {
                    $("#FS_FundingTypeTwoAmount").css('border-color', 'red');
                    $("#FS_TargetMessage").addClass("text-danger");
                    $("#FS_TargetMessage").html("Funding Type 2 Amount must great than zero ...");
                    return;
                }
                else
                {

                    if (_FS_FundingTypeTwo == '' || _FS_FundingTypeTwo == null) {
                        $("#FS_FundingTypeTwo").css('border-color', 'red');
                        $("#FS_TargetMessage").addClass("text-danger");
                        $("#FS_TargetMessage").html("Please select Funding Type 2  ...");
                        return;
                    }
                }

            }
        }

        // make sure funding type 2 has value must have amount
        if ( (_FS_FundingTypeTwo != '' && _FS_FundingTypeTwo != null) && (_FS_FundingTypeTwoAmount == '' || _FS_FundingTypeTwoAmount == null)) {
            $("#FS_FundingTypeTwoAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please fill in valid Amount ...");
            return;
        }


        var _FS_Deliverable = $('#FS_Deliverable').val();
        var _FS_Enclosure = $('#FS_Enclosure').val();
        // FS_BaseAnnualizedAmount
        var _FS_AdditionalCommentOne = $('#FS_AdditionalCommentOne').val();
        var _FS_AdditionalCommentTwo = $('#FS_AdditionalCommentTwo').val();

        var _FS_BaseAnnualizedAmount = $('#FS_BaseAnnualizedAmount').val();
        if (IsValidNegativeCurrencyFormat(_FS_BaseAnnualizedAmount) == false) {
            $("#FS_BaseAnnualizedAmount").css('border-color', 'red');
            $("#FS_TargetMessage").addClass("text-danger");
            $("#FS_TargetMessage").html("Please fill in valid Amount ...");
            return;
        }
        else
        {
            if (tclhinIsZeroValueEntered(_FS_BaseAnnualizedAmount) == true) {
                $("#FS_BaseAnnualizedAmount").css('border-color', 'red');
                $("#FS_TargetMessage").addClass("text-danger");
                $("#FS_TargetMessage").html("Must great than zero ...");
                return;
            }
        }




        // var _FundingEntityStatusIDText = $("#FundingEntityStatusID option:selected").text();
        var _FS_FiscalYearText = $("#FS_FiscalYear option:selected").text();
        var _FS_ProgramIDText = $("#FS_ProgramID option:selected").text();
        var _FS_SectorIDText = $("#FS_SectorID option:selected").text();
        var _FS_TCLHINLeadIDText = $("#FS_TCLHINLeadID option:selected").text();
        var _FS_HSPIDText = $("#FS_HSPID option:selected").text();
        var _FS_TPBEIDText = $("#FS_TPBEID option:selected").text();
        var _FS_FundingTypeOneText = $("#FS_FundingTypeOne option:selected").text();
        var _FS_FundingTypeTwoText = $("#FS_FundingTypeTwo option:selected").text();

        var _NextRowId = $("#FS_RowId").val();
      
        // console.log("Next Row Id : " + _NextRowId);
        var _Row_NameId = _tRow_Name_Prefix + _NextRowId;
        var _Row_HspTextId = _tRow_HspTextId_Prefix + _NextRowId;
        var _Row_HspValueId = _tRow_HspValueId_Prefix + _NextRowId;
        var _Row_FiscalYearValueId = _tRow_FiscalYearValueId_Prefix + _NextRowId;
        var _Row_ProgramValueId = _tRow_ProgramValueId_Prefix + _NextRowId;
        var _Row_TclhinLeadValueId = _tRow_TclhinLeadValueId_Prefix + _NextRowId;
        var _Row_TpbeTextId = _tRow_TpbeTextId_Prefix + _NextRowId;
        var _Row_TpbeValueId = _tRow_TpbeValueId_Prefix + _NextRowId;
        var _Row_SectorTextId = _tRow_SectorTextId_Prefix + _NextRowId;
        var _Row_SectorValueId = _tRow_SectorValueId_Prefix + _NextRowId;
        var _Row_FundingTypeOneTextId = _tRow_FundingTypeOneTextId_Prefix + _NextRowId;
        var _Row_FundingTypeOneValueId = _tRow_FundingTypeOneValueId_Prefix + _NextRowId;
        var _Row_FundingTypeOneAmountValueId = _tRow_FundingTypeOneAmountValueId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoTextId = _tRow_FundingTypeTwoTextId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoValueId = _tRow_FundingTypeTwoValueId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoAmountValueId = _tRow_FundingTypeTwoAmountValueId_Prefix + _NextRowId;
        var _Row_DeliverableValueId = _tRow_DeliverableValueId_Prefix + _NextRowId;
        var _Row_EnclosureValueId = _tRow_EnclosureValueId_Prefix + _NextRowId;
        var _Row_FS_BaseAnnualizedAmountId = _tRow_BaseAnnualizedAmountValueId_Prefix + _NextRowId;
        var _Row_FS_AdditionalCommentOneId = _tRow_AdditionalCommentOneValueId_Prefix + _NextRowId;
        var _Row_FS_AdditionalCommentTwoId = _tRow_AdditionalCommentTwoValueId_Prefix + _NextRowId;


        // First Column
        $("#" + _Row_NameId).val(_FS_Name);
        $("#" + _Row_HspTextId).text(_FS_HSPIDText);
        $("#" + _Row_HspValueId).val(_FS_HSPID);

        // Second Column
        $("#" + _Row_FundingTypeOneTextId).text(_FS_FundingTypeOneText);
        $("#" + _Row_FundingTypeOneValueId).val(_FS_FundingTypeOne);
        $("#" + _Row_FiscalYearValueId).val(_FS_FiscalYear);
        $("#" + _Row_ProgramValueId).val(_FS_ProgramID);
        $("#" + _Row_SectorValueId).val(_FS_SectorID);
        $("#" + _Row_SectorTextId).val(_FS_SectorIDText);
        $("#" + _Row_TclhinLeadValueId).val(_FS_TCLHINLeadID);
        $("#" + _Row_TpbeTextId).val(_FS_TPBEIDText);
        $("#" + _Row_TpbeValueId).val(_FS_TPBEID);
        $("#" + _Row_FundingTypeTwoTextId).text(_FS_FundingTypeTwoText);
        $("#" + _Row_FundingTypeTwoValueId).val(_FS_FundingTypeTwo);
        $("#" + _Row_FundingTypeTwoAmountValueId).val(_FS_FundingTypeTwoAmount);
        $("#" + _Row_DeliverableValueId).val(_FS_Deliverable);

        // Third Column
        $("#" + _Row_FundingTypeOneAmountValueId).text(_FS_FundingTypeOneAmount);
        $("#" + _Row_EnclosureValueId).val(_FS_Enclosure);
        $("#" + _Row_FS_BaseAnnualizedAmountId).val(_FS_BaseAnnualizedAmount);
        $("#" + _Row_FS_AdditionalCommentOneId).val(_FS_AdditionalCommentOne);
        $("#" + _Row_FS_AdditionalCommentTwoId).val(_FS_AdditionalCommentTwo);

        // Fourth Column
        $("#FS_TargetMessage").html('Save record successfully .');
        $("#FS_TargetMessage").addClass("text-primary");

    });



    $("#btnUploadFile").on('click', function () {

        $("#TargetMessage").html('');

        var _imageFile = $("#ImageFile").val();
     
        if ( _imageFile == null || _imageFile == '')
        {
            $("#TargetMessage").html('Please Browse select file .');
            $("#TargetMessage").addClass("text-danger");
            return;
        }

        var fileData = new FormData();
    
        var files = $("#ImageFile").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            fileData.append("UploadedImage", files[0]);
        }

        // Make Ajax request with the contentType = false, and procesData = false
        $.ajax({
            url: '/api/AdminLetterApi/ImageFileUpload/',
            type: 'POST',
            data: fileData,
            processData: false,
            contentType: false,
            success: function (data) {
                $("#errorTBBody").empty();
               
                for (var i = 0 ; i < data.length; i++)
                {
                    var _item = data[i];
                    if ( _item.lineResult.isValid == true)
                    {
                        BuildImported_ValidFundingSourceTable(_item);
                    } else {
                         $("#errorTB").show();
                        BuildImported_ErrorFundingSourceTable(_item);
                    }
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                $("#targetMessage").html(err.message);
                $("#targetMessage").addClass("text-danger");
            }
        });


    })



});


function IsInt(value) {

    var er = /^-?[0-9]+$/;

    return er.test(value);
}



function IsValidNegativeCurrencyFormat(input)
{
   // var RE = /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
    var RE = /^\$?-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
    return (RE.test(input));
}


function IsValidPositiveCurrencyFormat(input) {
   
    // var RE = /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
    // allow negative from /^\$?- to /^\$?-? .
    // var RE = /^\$?-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
     var RE = /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
    return (RE.test(input));
}



function DeleteRow(RowId)
{
    // console.log("Delete Row # : " + RowId);
    $("#" + RowId).remove();
}


function EditRow(_NextRowId)
{
    // Clear last time left dirty 
    $("#FS_TargetMessage").html('');
    $("#FS_TargetMessage").removeClass("text-danger");
    $("#FS_TargetMessage").removeClass("text-info");
    $("#FS_Name").css('border-color', '');
    $("#FS_FiscalYear").css('border-color', '');
    $("#FS_ProgramID").css('border-color', '');
    $("#FS_SectorID").css('border-color', '');
    $("#FS_TCLHINLeadID").css('border-color', '');
    $("#FS_HSPID").css('border-color', '');
    $("#FS_TPBEID").css('border-color', '');
    $("#FS_FundingTypeOne").css('border-color', '');
    $("#FS_FundingTypeOneAmount").css('border-color', '');
    $("#FS_Deliverable").css('border-color', '');
    $("#FS_FundingTypeTwo").css('border-color', '');
    $("#FS_FundingTypeTwoAmount").css('border-color', '');
    $("#FS_BaseAnnualizedAmount").css('border-color', '');

    // hidden id vs value
    var _Row_NameId = _tRow_Name_Prefix + _NextRowId;
    var _Row_HspTextId = _tRow_HspTextId_Prefix + _NextRowId;
    var _Row_HspValueId = _tRow_HspValueId_Prefix + _NextRowId;
    var _Row_FiscalYearValueId = _tRow_FiscalYearValueId_Prefix + _NextRowId;
    var _Row_ProgramValueId = _tRow_ProgramValueId_Prefix + _NextRowId;
    var _Row_TclhinLeadValueId = _tRow_TclhinLeadValueId_Prefix + _NextRowId;
    var _Row_TpbeTextId = _tRow_TpbeTextId_Prefix + _NextRowId;
    var _Row_TpbeValueId = _tRow_TpbeValueId_Prefix + _NextRowId;
    var _Row_SectorTextId = _tRow_SectorTextId_Prefix + _NextRowId;
    var _Row_SectorValueId = _tRow_SectorValueId_Prefix + _NextRowId;
    var _Row_FundingTypeOneTextId = _tRow_FundingTypeOneTextId_Prefix + _NextRowId;
    var _Row_FundingTypeOneValueId = _tRow_FundingTypeOneValueId_Prefix + _NextRowId;
    var _Row_FundingTypeOneAmountValueId = _tRow_FundingTypeOneAmountValueId_Prefix + _NextRowId;
    var _Row_FundingTypeTwoTextId = _tRow_FundingTypeTwoTextId_Prefix + _NextRowId;
    var _Row_FundingTypeTwoValueId = _tRow_FundingTypeTwoValueId_Prefix + _NextRowId;
    var _Row_FundingTypeTwoAmountValueId = _tRow_FundingTypeTwoAmountValueId_Prefix + _NextRowId;
    var _Row_DeliverableValueId = _tRow_DeliverableValueId_Prefix + _NextRowId;
    var _Row_EnclosureValueId = _tRow_EnclosureValueId_Prefix + _NextRowId;
    var _Row_BaseAnnualizedAmountId = _tRow_BaseAnnualizedAmountValueId_Prefix + _NextRowId;
    var _Row_AdditionalCommentOneId = _tRow_AdditionalCommentOneValueId_Prefix + _NextRowId;
    var _Row_AdditionalCommentTwoId = _tRow_AdditionalCommentTwoValueId_Prefix + _NextRowId;

    // Get Value
    var _FS_Name = $("#" + _Row_NameId).val();
    var _FS_FiscalYear = $("#" + _Row_FiscalYearValueId).val();
    var _FS_ProgramID = $("#" + _Row_ProgramValueId).val();
    var _FS_TCLHINLeadID = $("#" + _Row_TclhinLeadValueId).val();
    var _FS_HSPID = $("#" + _Row_HspValueId).val();
    var _FS_FundingTypeOne = $("#" + _Row_FundingTypeOneValueId).val();
    var _FS_FundingTypeOneAmount = $("#" + _Row_FundingTypeOneAmountValueId).text();
    var _FS_Deliverable = $("#" + _Row_DeliverableValueId).val();
    var _FS_FundingTypeTwo = $("#" + _Row_FundingTypeTwoValueId).val();
    var _FS_FundingTypeTwoAmount = $("#" + _Row_FundingTypeTwoAmountValueId).val();
    var _FS_TPBEID = $("#" + _Row_TpbeValueId).val();
    var _FS_TPBEID_Text = $("#" + _Row_TpbeTextId).val();
    var _FS_SectorID = $("#" + _Row_SectorValueId).val();
    var _FS_SectorID_Text = $("#" + _Row_SectorTextId).val();
    var _FS_Enclosure = $("#" + _Row_EnclosureValueId).val();
    var _FS_BaseAnnualizedAmount = $("#" + _Row_BaseAnnualizedAmountId).val();
    var _FS_AdditionalCommentOne = $("#" + _Row_AdditionalCommentOneId).val();
    var _FS_AdditionalCommentTwo = $("#" + _Row_AdditionalCommentTwoId).val();

    // Set Value
    $("#FS_RowId").val(_NextRowId);
    $("#FS_Name").val(_FS_Name);
    $("#FS_TCLHINLeadID").val(_FS_TCLHINLeadID);
    $("#FS_HSPID").val(_FS_HSPID);
    $("#FS_FundingTypeOne").val(_FS_FundingTypeOne);
    $("#FS_FundingTypeOneAmount").val(_FS_FundingTypeOneAmount);
    $("#FS_Deliverable").val(_FS_Deliverable);
    $("#FS_FiscalYear").val(_FS_FiscalYear);

    $("#FS_FundingTypeTwo").val(_FS_FundingTypeTwo);
    $("#FS_FundingTypeTwoAmount").val(_FS_FundingTypeTwoAmount);

    $("#FS_Deliverable").val(_FS_Deliverable);
    $("#FS_Enclosure").val(_FS_Enclosure);
    // console.log(_FS_Enclosure);
    $("#FS_BaseAnnualizedAmount").val(_FS_BaseAnnualizedAmount);
    $("#FS_AdditionalCommentOne").val(_FS_AdditionalCommentOne);
    $("#FS_AdditionalCommentTwo").val(_FS_AdditionalCommentTwo);

   
    RefreshSectorIdBy_HSPId(_FS_HSPID, _FS_SectorID);

    RefreshTPBEIdBy_SecotrId(_FS_SectorID, _FS_HSPID, _FS_TPBEID);


    // $("#FS_ProgramID").val(_FS_ProgramID);
    RefreshProgramID(_FS_FiscalYear, _FS_ProgramID);

    $("#FS_AddBtn").hide();
    $("#FS_SaveBtn").show();
    $("#FundingSourceModal").modal({ backdrop: false });

}



function RefreshProgramID(fiscalYear, programID)
{
    var FiscalYear = { FiscalYear1: fiscalYear };
    $.ajax({
        url: '/api/ProgramApi/GetProgramByFiscalYear/',
        type: 'POST',
        data: JSON.stringify(FiscalYear),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $('#FS_ProgramID').empty();
            $('#FS_ProgramID').append("<option value=''> Select ... </option>");
            for (var i = 0 ; i < data.length; i++) {
                //  $('#ProvinceId').append($('<option></option>').val(data[i].ProvinceId).html(data[i].ProvinceName));
                $('#FS_ProgramID').append("<option value='" + data[i].programID + "'>" + data[i].programDescription + "</option>");
            }
            $("#FS_ProgramID").val(programID);
        },
    });

}



function CreateAdminLetter()
{
    var _yearSelectIdPrefix = "multiYearSelect_";
    var _yearBaseIdPrefix = "multiYearReceivedBase_";
    var _yearOneTimeIdPrefix = "multiYearReceivedOneTime_";

    // Clear last time left dirty 
    $("#AdminLetterMessage").html('');
    $("#AdminLetterMessage").removeClass("text-danger");
    $("#AdminLetterMessage").removeClass("text-info");
    $("#Name").css('border-color', '');
    $("#FiscalYear").css('border-color', '');
    $("#ReceivedAmountText").css('border-color', '');
    $("#NumberFundingLetters").css('border-color', '');
    $("#ReferenceNo").css('border-color', '');
    $("#MultiYear").css('border-color', '');

    for (var i = 1; i < 6; i++)
    {
        var _yearSelectId = _yearSelectIdPrefix + i;
        var _yearBaseId = _yearBaseIdPrefix + i;
        var _yearOneTimeId = _yearOneTimeIdPrefix + i;

        $("#" + _yearSelectId).css('border-color', '');
        $("#" + _yearBaseId).css('border-color', '');
        $("#" + _yearOneTimeId).css('border-color', '');
    }


    // Validation first 
    // Title
    var _Name = $('#Name').val();
    if (_Name == '' || _Name == null) {
        $("#Name").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Please enter Title ...");
        return;
    }

    if ( _Name.length > 200 ) {
        $("#Name").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("The field Title must be a string with a maximum length of 200.");
        return;
    }


    var _ReferenceNo = $("#ReferenceNo").val();
    if (_ReferenceNo == '' || _ReferenceNo == null) {
        $("#ReferenceNo").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Please enter reference no ...");
        return;
    }

    if (_ReferenceNo.length > 50) {
        $("#ReferenceNo").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("The field Admin Letter Reference No must be a string with a maximum length of 50.");
        return;
    }

    if (_gIsReferenceNoUnique == false)
    {
        $("#ReferenceNo").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Reference No may existed, or not unique .");
        return;
    }



    var _MultiYear = $("#MultiYear").val();
    if (_MultiYear == '' || _MultiYear == null) {
        $("#MultiYear").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Please select Multi Year ...");
        return;
    }

     // ReceivedDate
    var _ReceivedDate = $("#ReceivedDate").val();

    // AdminLetterDate
    var _AdminLetterDate = $("#AdminLetterDate").val();

    // TCLHINLeadId
    var  _TCLHINLeadId = $('#TCLHINLeadId').val();
    if ( _TCLHINLeadId == '' || _TCLHINLeadId == null) {
        $("#TCLHINLeadId").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Please select LHIN Lead ...");
        return;
    }

    // SMTLeadId
    var  _SMTLeadId = $('#SMTLeadId').val();
    if ( _SMTLeadId == '' || _SMTLeadId == null) {
        $("#SMTLeadId").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Please select LHIN Director ...");
        return;
    }

   
    // NumberFundingLetters
    var _NumberFundingLetters = $("#NumberFundingLetters").val();
    if (_NumberFundingLetters != '' &&  _NumberFundingLetters != null )
    {
        // check if is valid digit
        if ( IsInt(_NumberFundingLetters) == false )
        {
            $("#NumberFundingLetters").css('border-color', 'red');
            $("#AdminLetterMessage").addClass("text-danger");
            $("#AdminLetterMessage").html("Funding Letters Number Only ...");
            return;
        }
    }

   
    // Description
    var _Description = $("#Description").val();

    // Hidden Fields
    // FiscalYear  // hidden
    var _FiscalYear = $('#FiscalYear').val();
    //if (_FiscalYear == '' || _FiscalYear == null) {
    //    $("#FiscalYear").css('border-color', 'red');
    //    $("#AdminLetterMessage").addClass("text-danger");
    //    $("#AdminLetterMessage").html("Please select Fiscal Year ...");
    //    return;
    //}

    // ReceivedAmountText  // Hidden
    var _ReceivedAmountText = $('#ReceivedAmountText').val();

    //if (_ReceivedAmountText == '' || _ReceivedAmountText == null) {
    //    $("#ReceivedAmountText").css('border-color', 'red');
    //    $("#AdminLetterMessage").addClass("text-danger");
    //    $("#AdminLetterMessage").html("Please enter Received Amount ...");
    //    return;
    //}

    //if (IsValidPositiveCurrencyFormat(_ReceivedAmountText) == false) {
    //    $("#ReceivedAmountText").css('border-color', 'red');
    //    $("#AdminLetterMessage").addClass("text-danger");
    //    $("#AdminLetterMessage").html("Please fill in valid Received Amount ...");
    //    return;
    //}

    // Check MultiYear => fiscalYear, base, onetime
    // First Year Must Be There
    var _firstFiscalYearVal = $("#multiYearSelect_1").val();
    if (_firstFiscalYearVal == null || _firstFiscalYearVal == "")
    {
        $("#multiYearSelect_1").css('border-color', 'red');
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Please select First Fiscal Year ...");
        return;
    }
   
    var _firstBaseVal = $("#multiYearReceivedBase_1").val();
    var _firstOneTimeVal = $("#multiYearReceivedOneTime_1").val();

    if ( (_firstBaseVal == null || _firstBaseVal == "") && (_firstOneTimeVal == null || _firstOneTimeVal == ""))
    {
        $("#multiYearReceivedBase_1").css('border-color', 'red');
        $("#multiYearReceivedOneTime_1").css('border-color', 'red');

        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").html("Please enter First Fiscal Year Received Base or Received One Time . ");
        return;
    }

    // check _firstBaseVal valid amount
    if (_firstBaseVal != null && _firstBaseVal != "")
    {
        if (tclhinNegativeCurrencyFormatValidation(_firstBaseVal) == false) {
            $("#multiYearReceivedBase_1").css('border-color', 'red');
            $("#AdminLetterMessage").addClass("text-danger");
            $("#AdminLetterMessage").text("Please fill in valid base Amount.");
            return ;
        }
    }

    // check _firstOneTimeVal valid amount
    if (_firstOneTimeVal != null && _firstOneTimeVal != "") {
        if (tclhinNegativeCurrencyFormatValidation(_firstOneTimeVal) == false) {
            $("#multiYearReceivedOneTime_1").css('border-color', 'red');
            $("#AdminLetterMessage").addClass("text-danger");
            $("#AdminLetterMessage").text("Please fill in valid One Time Amount.");
            return;
        }
    }

    if (_MultiYear == "True")
    {
        // Second Year Must be there
        var _secondFiscalYearVal = $("#multiYearSelect_2").val();
        if (_secondFiscalYearVal == null || _secondFiscalYearVal == "") {
            $("#multiYearSelect_2").css('border-color', 'red');
            $("#AdminLetterMessage").addClass("text-danger");
            $("#AdminLetterMessage").html("Please select Second Fiscal Year ...");
            return;
        }

        var _secondBaseVal = $("#multiYearReceivedBase_2").val();
        var _secondOneTimeVal = $("#multiYearReceivedOneTime_2").val();

        if ((_secondBaseVal == null || _secondBaseVal == "") && (_secondOneTimeVal == null || _secondOneTimeVal == "")) {
            $("#multiYearReceivedBase_2").css('border-color', 'red');
            $("#multiYearReceivedOneTime_2").css('border-color', 'red');
            $("#AdminLetterMessage").addClass("text-danger");
            $("#AdminLetterMessage").html("Please enter Second Fiscal Year Received Base or Received One Time . ");
            return ;
        }

        // check _secondBaseVal valid amount
        if (_secondBaseVal != null && _secondBaseVal != "") {
            if (tclhinNegativeCurrencyFormatValidation(_secondBaseVal) == false) {
                $("#multiYearReceivedBase_2").css('border-color', 'red');
                $("#AdminLetterMessage").addClass("text-danger");
                $("#AdminLetterMessage").text("Please fill in valid base Amount.");
                return;
            }
        }

        // check _secondOneTimeVal valid amount
        if (_secondOneTimeVal != null && _secondOneTimeVal != "") {
            if (tclhinNegativeCurrencyFormatValidation(_secondOneTimeVal) == false) {
                $("#multiYearReceivedOneTime_2").css('border-color', 'red');
                $("#AdminLetterMessage").addClass("text-danger");
                $("#AdminLetterMessage").text("Please fill in valid One Time Amount.");
                return;
            }
        }

        // Check Three, Four, Five, Optional
        for ( var i = 3 ; i < 6; i++)
        {
            var _yearSelectId = _yearSelectIdPrefix + i;
            var _yearBaseId = _yearBaseIdPrefix + i;
            var _yearOneTimeId = _yearOneTimeIdPrefix + i;

            var _yearSelectVal = $("#" + _yearSelectId).val();
            var _yearBaseVal = $("#" + _yearBaseId).val();
            var _yearOneTimeVal = $("#" + _yearOneTimeId).val();

            if ( _yearSelectVal != null && _yearSelectVal != "" )
            {
                if ((_yearBaseVal == null || _yearBaseVal == "") && (_yearOneTimeVal == null || _yearOneTimeVal == "")) {
                    $("#" + _yearBaseId).css('border-color', 'red');
                    $("#" + _yearOneTimeId).css('border-color', 'red');
                    $("#AdminLetterMessage").addClass("text-danger");
                    $("#AdminLetterMessage").html("Please enter Received Base or Received One Time . ");
                    return;

                }
            }

            
            if ((_yearBaseVal != null && _yearBaseVal != "") || (_yearOneTimeVal != null && _yearOneTimeVal != ""))
            {
                if (_yearSelectVal == null || _yearSelectVal == "")
                {
                    $("#" + _yearSelectId).css('border-color', 'red');

                    $("#AdminLetterMessage").addClass("text-danger");
                    $("#AdminLetterMessage").html("Please select fiscal year . ");
                    return;
                }
            }


            // check base amount
            if (_yearBaseVal != null && _yearBaseVal != "") {
                if (tclhinNegativeCurrencyFormatValidation(_yearBaseVal) == false) {
                    $("#" + _yearBaseId).css('border-color', 'red');
                    $("#AdminLetterMessage").addClass("text-danger");
                    $("#AdminLetterMessage").text("Please fill in valid base Amount.");
                    return;
                }
            }

            // check one time 
            if (_yearOneTimeVal != null && _yearOneTimeVal != "") {
                if (tclhinNegativeCurrencyFormatValidation(_yearOneTimeVal) == false) {
                    $("#" + _yearOneTimeId).css('border-color', 'red');
                    $("#AdminLetterMessage").addClass("text-danger");
                    $("#AdminLetterMessage").text("Please fill in valid one time Amount.");
                    return;
                }
            }
        }  
    }


    // check duplicate fiscal year
    var _multiFiscalYearSelections = [];
    for (var i = 1; i < 6; i++) {
        var _yearSelectId = _yearSelectIdPrefix + i;
        var _yearfiscalYearVal = $("#" + _yearSelectId).val();
        if ( _yearfiscalYearVal != null && _yearfiscalYearVal != "")
        {
            _multiFiscalYearSelections.push(_yearfiscalYearVal);
        }
    }

    
    var _fiscalYearResult = findDuplicates(_multiFiscalYearSelections);
    if (_fiscalYearResult.length > 0)
    {
         
        $("#AdminLetterMessage").addClass("text-danger");
        $("#AdminLetterMessage").text("Duplicate fiscal year found .");

        for (var i = 0; i < _fiscalYearResult.length; i++)
        {
            var _yearDuplicateItem = _fiscalYearResult[i];
            for( var j = 1 ; j < 6; j++)
            {
                var _yearSelectId = _yearSelectIdPrefix + j;
                var _yearFiscalVal = $("#" + _yearSelectId).val();
                if ( _yearDuplicateItem ==_yearFiscalVal )
                {
                    $("#" + _yearSelectId).css('border-color', 'red');
                }
            }

        }

        return;
    }

    // then only valid adminLetter single - Multi FiscalYear
    var _multiYearBool = (_MultiYear == "True") ? "True" : "False";

    // MultiYear
    var _BudgetYearArray = [];

    // get dropdownlist selected text
    // $("#" + fiscalYear + "option:selected").text(); // doesn't work
    // option 1
    // var fiscalYear = "multiYearSelect_1";
    // var yy = $("#" + fiscalYear).find('option:selected').text();
    // option 2
    // var kk = $("option:selected", $("#" + fiscalYear)).text()

    for (var i = 1 ; i < 6; i++)
    {
        var _yearSelectId = _yearSelectIdPrefix + i;
        var _yearBaseId = _yearBaseIdPrefix + i;
        var _yearOneTimeId = _yearOneTimeIdPrefix + i;

        var _yearSelectVal = $("#" + _yearSelectId).val();
        var _yearSelect_DisplayText = $("option:selected", $("#" + _yearSelectId)).text();

        var _yearBaseVal = $("#" + _yearBaseId).val();
        _yearBaseVal = _yearBaseVal.replace("$", "");
        _yearBaseVal = _yearBaseVal.replace(/,/g, "");

        var _yearOneTimeVal = $("#" + _yearOneTimeId).val();
        _yearOneTimeVal = _yearOneTimeVal.replace("$", "");
        _yearOneTimeVal = _yearOneTimeVal.replace(/,/g, "");

        if (_yearSelectVal != null && _yearSelectVal != "") {
            if (_yearBaseVal == null || _yearBaseVal == "") {
                _yearBaseVal = "0.00";
            }

            if (_yearOneTimeVal == null || _yearOneTimeVal == "") {
                _yearOneTimeVal = "0.00";
            }

            var BudgetYear = {
                FiscalYear: _yearSelectVal,
                BudgetYear1: _yearSelect_DisplayText,
                ReceivedBaseAmount: _yearBaseVal,
                ReceivedOneTimeAmount: _yearOneTimeVal
            }

            _BudgetYearArray.push(BudgetYear);
        }

    }

    // next get all fiscal year in funding source, if one of them funding source fiscal year 
    // not match Fiscal Year in Admin Letter, then return , show error message
    var _fundingSourceAllFiscalYearArr = [];

    $('#FS_Table > tbody  > tr').each(function (index) {
        var _RowId = $(this).attr("id");
        var _FS_FiscalYearId = _tRow_FiscalYearValueId_Prefix + _RowId;
        var _FS_FiscalYearId_Val = $("#" + _FS_FiscalYearId).val();
        _fundingSourceAllFiscalYearArr.push(_FS_FiscalYearId_Val);
    });


    if (_fundingSourceAllFiscalYearArr.length > 0)
    {
        var _Is_FS_FiscalYear_ExistedInAdminLetter_FiscalYear = true;

        // check  FS fiscal year if existed in admin letter fiscal year
        for ( var i = 0; i < _fundingSourceAllFiscalYearArr.length; i++)
        {
            // outer loop
            var _FSYearItemFound = false;
            var _FS_FiscalYear_ItemVal = _fundingSourceAllFiscalYearArr[i];

            for ( var j = 0;  j < _BudgetYearArray.length; j++)
            {    // inner loop
                var _byObject = _BudgetYearArray[j];
                var _byFiscalYear_ItemVal = _byObject.FiscalYear;
                if ( _FS_FiscalYear_ItemVal  == _byFiscalYear_ItemVal)
                {
                    _FSYearItemFound = true;
                }
            }
            //  inner loop finished
            if (_FSYearItemFound  == false )
            {
                _Is_FS_FiscalYear_ExistedInAdminLetter_FiscalYear = false;
                $("#AdminLetterMessage").addClass("text-danger");
                $("#AdminLetterMessage").text("Funding Source Fiscal Year " + _FS_FiscalYear_ItemVal + " not existed in  Admin Letter Fiscal Year ?");
                break;
            }
        }

        if ( _Is_FS_FiscalYear_ExistedInAdminLetter_FiscalYear == false)
        {
            return;
        }

    }

    // check if total of  FundingSource base amount great than admin letter base amount by fiscal year , 
    // in same fiscal Year, same as one time need to check amount
    if (_fundingSourceAllFiscalYearArr.length > 0)
    {
        var _isAmountGreatThanFound = false;

        // outer loop
        for (var i = 0; i < _BudgetYearArray.length; i++)
        {
            var _byObject = _BudgetYearArray[i];
            var _byFiscalYear = _byObject.FiscalYear;
            var _byBaseAmount = parseFloat(_byObject.ReceivedBaseAmount);
            var _byOneTimeAmount = parseFloat(_byObject.ReceivedOneTimeAmount);

            var _fsBaseAmount = 0;
            var _fsOneTimeAmount = 0;
            // find same fiscal year in Funding Source Tables, 

            $('#FS_Table > tbody  > tr').each(function (index)
            {
                var _RowId = $(this).attr("id");

                var _FS_FiscalYearId = _tRow_FiscalYearValueId_Prefix + _RowId;
                var _FS_FiscalYearId_Val = $("#" + _FS_FiscalYearId).val();

                var _FS_FundingTypeOneId =  _tRow_FundingTypeOneValueId_Prefix + _RowId;
                var _FS_FundingTypeOneId_Value = $("#" + _FS_FundingTypeOneId).val();
                var _FS_FundingTypeOneAmountId = _tRow_FundingTypeOneAmountValueId_Prefix + _RowId;
                var _FS_FundingTypeOneAmountId_Value = $("#" + _FS_FundingTypeOneAmountId).text();  // this in display text
                // check value, or set 0; convert to Float
                if ( _FS_FundingTypeOneAmountId_Value != null && _FS_FundingTypeOneAmountId_Value != "")
                {
                    _FS_FundingTypeOneAmountId_Value = CurrencyToFloat(_FS_FundingTypeOneAmountId_Value);
                } else {
                    _FS_FundingTypeOneAmountId_Value = parseFloat("0.00");
                }


                var _FS_FundingTypeTwoId =  _tRow_FundingTypeTwoValueId_Prefix + _RowId;
                var _FS_FundingTypeTwoId_Value = $("#" + _FS_FundingTypeTwoId).val();
                var _FS_FundingTypeTwoAmountId = _tRow_FundingTypeTwoAmountValueId_Prefix + _RowId;
                var _FS_FundingTypeTwoAmountId_Value = $("#" + _FS_FundingTypeTwoAmountId).val();
                // check value, or set 0; convert to Float
                if ( _FS_FundingTypeTwoAmountId_Value != null && _FS_FundingTypeTwoAmountId_Value != "")
                {
                    _FS_FundingTypeTwoAmountId_Value = CurrencyToFloat(_FS_FundingTypeTwoAmountId_Value);
                } else {
                    _FS_FundingTypeTwoAmountId_Value = parseFloat("0.00");
                }


                if ( _byFiscalYear == _FS_FiscalYearId_Val)
                {
                    // Type One
                    if ( _FS_FundingTypeOneId_Value != null && _FS_FundingTypeOneId_Value != "")
                    {
                        // 1 means base, 2 means one-time
                        if ( _FS_FundingTypeOneId_Value == "1")
                        {
                            _fsBaseAmount = _fsBaseAmount + _FS_FundingTypeOneAmountId_Value;
                        }
                        else if (_FS_FundingTypeOneId_Value == "2")
                        {
                            _fsOneTimeAmount = _fsOneTimeAmount + _FS_FundingTypeOneAmountId_Value;
                        }

                    }

                    // Type Two
                    if (_FS_FundingTypeTwoId_Value != null && _FS_FundingTypeTwoId_Value != "")
                    {
                        // 1 means base, 2 means one-time
                        if (_FS_FundingTypeTwoId_Value == "1") {
                            _fsBaseAmount = _fsBaseAmount + _FS_FundingTypeTwoAmountId_Value;
                        }
                        else if (_FS_FundingTypeTwoId_Value == "2") {
                            _fsOneTimeAmount = _fsOneTimeAmount + _FS_FundingTypeTwoAmountId_Value;
                        }

                    }

                }

            });

            if ( _fsBaseAmount >  _byBaseAmount )
            {
                $("#AdminLetterMessage").addClass("text-danger");
                $("#AdminLetterMessage").text("The total of funding source base amount great than admin letter base amount in fiscal year " + _byFiscalYear);
                _isAmountGreatThanFound = true;
                break;
            }

            if (_fsOneTimeAmount > _byOneTimeAmount) {
                $("#AdminLetterMessage").addClass("text-danger");
                $("#AdminLetterMessage").text("The total of funding source one time amount great than admin letter one time amount in fiscal year " + _byFiscalYear);
                _isAmountGreatThanFound = true;
                break;
            }
        }

        if (  _isAmountGreatThanFound == true)
        {
            return;
        }
    }

  
    // old version hide
    //var _TotalLineAmount =  GetSumOfFundingSourceAmount();
    //var _ReceivedAmount = CurrencyToFloat(_ReceivedAmountText);
    //if (_TotalLineAmount > _ReceivedAmount )
    //{
    //    $("#ReceivedAmountText").css('border-color', 'red');
    //    $("#AdminLetterMessage").addClass("text-danger");
    //    $("#AdminLetterMessage").html("Total Funding Source Amount " + _TotalLineAmount + " can not great than Received Amount " +  _ReceivedAmount);
    //    return;
    //}

    

    var _SigningDirector = $('#SigningDirector').val();
    var _SigningVicePresident = $('#SigningVicePresident').val();
    var _EASigningVicePresident = $('#EASigningVicePresident').val();
    var _SigningChiefRegionalOfficer = $('#SigningChiefRegionalOfficer').val();
    var _EACEO = $('#EACEO').val();


    // Going to submit  (Amin Letter)
    var adminLetterVM = {
        Name : _Name,
        FiscalYear: _FiscalYear,
        TCLHINLeadId: _TCLHINLeadId,
        SMTLeadId : _SMTLeadId,
        NumberFundingLetters : _NumberFundingLetters,
        ReceivedDate : _ReceivedDate,
        AdminLetterDate : _AdminLetterDate,
        ReceivedAmountText : _ReceivedAmountText,
        Description: _Description,
        ReferenceNo: _ReferenceNo,
        MultiYear: _multiYearBool,
        SigningDirector: _SigningDirector,
        SigningVicePresident: _SigningVicePresident,
        EASigningVicePresident: _EASigningVicePresident,
        SigningChiefRegionalOfficer: _SigningChiefRegionalOfficer,
        EACEO: _EACEO
    };

    var _FundingSourceArray = [];
    _FundingSourceArray = GetArrayOfFundingSource();


    // prepare to submit by ajax

    $.ajax({
        url: '/AdminLetter/Ajax_Create/',
        type: 'POST',
        data: JSON.stringify({ model: adminLetterVM, fundingSourceList: _FundingSourceArray, budgetYearList: _BudgetYearArray }),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, xhr) {
            if (data.GetStatus == 1) {

                $("#AdminLetterMessage").removeClass("text-danger");
                $("#AdminLetterMessage").text(data.Message);
                $("#AdminLetterMessage").addClass("text-success");

                window.location = '/AdminLetter/Edit/' + data.AdminLetterID;
                
            } else {
                $("#AdminLetterMessage").text(data.Message);
                $("#AdminLetterMessage").addClass("text-danger");
            }
        },
        error: function (xhr, status, error) {
            $("#AdminLetterMessage").text(data.Message);
            $("#AdminLetterMessage").addClass("text-danger");
        }

    });





}



function GetSumOfFundingSourceAmount()
{
    var _Sum = 0.00;

    $('#FS_Table > tbody  > tr').each(function (index) {
       // console.log($(this).attr("id"));
        var _RowId = $(this).attr("id");
        var _FundingTypeOneAmountValueId = _tRow_FundingTypeOneAmountValueId_Prefix + _RowId;
        var _AmountCurrency = $("#" + _FundingTypeOneAmountValueId).text();
        _Sum += CurrencyToFloat(_AmountCurrency);
       
        var _FundingTypeTwoId = _tRow_FundingTypeTwoValueId_Prefix + _RowId;
        var _FundingTypeTwoId_Value = $("#" + _FundingTypeTwoId).val();

        var _FundingTypeTwoAmountId = _tRow_FundingTypeOneAmountValueId_Prefix + _RowId;
        var _FundingTypeTwoAmountId_Value = $("#" + _FundingTypeTwoAmountId).val();

        if (_FundingTypeTwoId_Value != '' && _FundingTypeTwoId_Value != null &&
            _FundingTypeTwoAmountId_Value != '' && _FundingTypeTwoAmountId_Value != null)
        {
            _Sum += CurrencyToFloat(_FundingTypeTwoAmountId_Value);
        }


    });

    // console.log("Sum :" + _Sum);
    return _Sum;
}



function CurrencyToFloat(CurrencyStr)
{
    var str = CurrencyStr;

    //str = str.replace(",", "");
    //str = str.replace("$", "");

    str = str.replace(/,/g, "");
    str = str.replace("$", "");

    return parseFloat(str);
}


function GetArrayOfFundingSource()
{
    var arr = [];

    $('#FS_Table > tbody  > tr').each(function (index) {

        // console.log($(this).attr("id"));
        var _NextRowId = $(this).attr("id");
        var _Row_NameId = _tRow_Name_Prefix + _NextRowId;
        var _Row_HspTextId = _tRow_HspTextId_Prefix + _NextRowId;
        var _Row_HspValueId = _tRow_HspValueId_Prefix + _NextRowId;
        var _Row_FiscalYearValueId = _tRow_FiscalYearValueId_Prefix + _NextRowId;
        var _Row_ProgramValueId = _tRow_ProgramValueId_Prefix + _NextRowId;
        var _Row_TclhinLeadValueId = _tRow_TclhinLeadValueId_Prefix + _NextRowId;
        var _Row_SectorValueId = _tRow_SectorValueId_Prefix + _NextRowId;
        var _Row_TpbeValueId = _tRow_TpbeValueId_Prefix + _NextRowId;
        var _Row_FundingTypeOneTextId = _tRow_FundingTypeOneTextId_Prefix + _NextRowId;
        var _Row_FundingTypeOneValueId = _tRow_FundingTypeOneValueId_Prefix + _NextRowId;
        var _Row_FundingTypeOneAmountValueId = _tRow_FundingTypeOneAmountValueId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoTextId = _tRow_FundingTypeTwoTextId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoValueId = _tRow_FundingTypeTwoValueId_Prefix + _NextRowId;
        var _Row_FundingTypeTwoAmountValueId = _tRow_FundingTypeTwoAmountValueId_Prefix + _NextRowId;
        var _Row_DeliverableValueId = _tRow_DeliverableValueId_Prefix + _NextRowId;
        var _Row_EnclosureValueId = _tRow_EnclosureValueId_Prefix + _NextRowId;
        var _Row_BaseAnnualizedAmountId = _tRow_BaseAnnualizedAmountValueId_Prefix + _NextRowId;
        var _Row_AdditionalCommentOneId = _tRow_AdditionalCommentOneValueId_Prefix + _NextRowId;
        var _Row_AdditionalCommentTwoId = _tRow_AdditionalCommentTwoValueId_Prefix + _NextRowId;
       
       
        var _Name = $("#" + _Row_NameId).val();
        var _FiscalYear = $("#" + _Row_FiscalYearValueId).val();
        var _ProgramID = $("#" + _Row_ProgramValueId).val();
        var _SectorID = $("#" + _Row_SectorValueId).val();
        var _TCLHINLeadID = $("#" + _Row_TclhinLeadValueId).val();
        var _HSPID = $("#" + _Row_HspValueId).val();
        var _TPBEID = $("#" + _Row_TpbeValueId).val();
        var _FundingTypeOne = $("#" + _Row_FundingTypeOneValueId).val();
        var _FundingTypeOneAmountText = $("#" + _Row_FundingTypeOneAmountValueId).text();
        var _FundingTypeTwo = $("#" + _Row_FundingTypeTwoValueId).val();
        var _FundingTypeTwoAmountText = $("#" + _Row_FundingTypeTwoAmountValueId).val();
        var _Deliverables = $("#" + _Row_DeliverableValueId).text();
        var _Enclosure = $("#" + _Row_EnclosureValueId).val();
        var _BaseAnnualizedAmountText = $("#" + _Row_BaseAnnualizedAmountId).val();
        var _AdditionalCommentOne = $("#" + _Row_AdditionalCommentOneId).val();
        var _AdditionalCommentTwo = $("#" + _Row_AdditionalCommentTwoId).val();
       
        

        var NonDiscreVM = {
            Name : _Name,
            FiscalYear : _FiscalYear,
            ProgramID : _ProgramID,
            SectorID : _SectorID,
            TCLHINLeadID : _TCLHINLeadID,
            HSPID : _HSPID,
            TPBEID : _TPBEID,
            FundingTypeID : _FundingTypeOne,
            FundingTypeAmountText: _FundingTypeOneAmountText,
            FundingLetterDeliverables: _Deliverables,
            FundingTypeSecondID: _FundingTypeTwo,
            FundingTypeSecondAmountText: _FundingTypeTwoAmountText,
            Enclosure: _Enclosure,
            BaseAnnualizedAmountText: _BaseAnnualizedAmountText,
            AdditionalCommentOne: _AdditionalCommentOne,
            AdditionalCommentTwo: _AdditionalCommentTwo
        };

        arr.push(NonDiscreVM);
    });

    return arr;
}


function BuildImported_ValidFundingSourceTable(item)
{
   // console.log("valid :" + item.lineNo);
    var _NextRowId = 0;
    var _TotalRows = $("#FS_Table  tbody  tr").length;

    if (_TotalRows == 0 || _TotalRows == "0") {
        _NextRowId = 1;
    } else {
        var _LastRowId = $('#FS_Table > tbody tr:last').attr("id");
        _NextRowId = parseInt(_LastRowId) + 1;
    }

    // console.log("Next Row Id : " + _NextRowId);
    var _Row_NameId = _tRow_Name_Prefix + _NextRowId;
    var _Row_HspTextId = _tRow_HspTextId_Prefix + _NextRowId;
    var _Row_HspValueId = _tRow_HspValueId_Prefix + _NextRowId;
    var _Row_FiscalYearValueId = _tRow_FiscalYearValueId_Prefix + _NextRowId;
    var _Row_ProgramValueId = _tRow_ProgramValueId_Prefix + _NextRowId;
    var _Row_TclhinLeadValueId = _tRow_TclhinLeadValueId_Prefix + _NextRowId;
    var _Row_TpbeTextId = _tRow_TpbeTextId_Prefix + _NextRowId;
    var _Row_TpbeValueId = _tRow_TpbeValueId_Prefix + _NextRowId;
    var _Row_SectorTextId = _tRow_SectorTextId_Prefix + _NextRowId;
    var _Row_SectorValueId = _tRow_SectorValueId_Prefix + _NextRowId;
    var _Row_FundingTypeOneTextId = _tRow_FundingTypeOneTextId_Prefix + _NextRowId;
    var _Row_FundingTypeOneValueId = _tRow_FundingTypeOneValueId_Prefix + _NextRowId;
    var _Row_FundingTypeOneAmountValueId = _tRow_FundingTypeOneAmountValueId_Prefix + _NextRowId;
    var _Row_FundingTypeTwoTextId = _tRow_FundingTypeTwoTextId_Prefix + _NextRowId;
    var _Row_FundingTypeTwoValueId = _tRow_FundingTypeTwoValueId_Prefix + _NextRowId;
    var _Row_FundingTypeTwoAmountValueId = _tRow_FundingTypeTwoAmountValueId_Prefix + _NextRowId;
    var _Row_DeliverableValueId = _tRow_DeliverableValueId_Prefix + _NextRowId;
    var _Row_EnclosureValueId = _tRow_EnclosureValueId_Prefix + _NextRowId;
    var _Row_BaseAnnualizedAmountId = _tRow_BaseAnnualizedAmountValueId_Prefix + _NextRowId;
    var _Row_AdditionalCommentOneId = _tRow_AdditionalCommentOneValueId_Prefix + _NextRowId;
    var _Row_AdditionalCommentTwoId = _tRow_AdditionalCommentTwoValueId_Prefix + _NextRowId;

    var _NewRowContent = "<tr id=\"" + _NextRowId + "\" > " +
                                "<td><span id=\"" + _Row_HspTextId + "\" ></span> <input type=\"hidden\" id=\"" + _Row_HspValueId + "\">  <input type=\"hidden\" id=\"" + _Row_NameId + "\"> </td>" +
                                "<td>" + "<span id=\"" + _Row_FundingTypeOneTextId + "\"></span> "
                                       + "<input type=\"hidden\" id=\"" + _Row_FundingTypeOneValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_FiscalYearValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_ProgramValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_SectorValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_SectorTextId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_TclhinLeadValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_TpbeTextId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_TpbeValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_FundingTypeTwoTextId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_FundingTypeTwoValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_FundingTypeTwoAmountValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_DeliverableValueId + "\">"
                                       +
                               "</td>" +
                               "<td>" + "<span id=\"" + _Row_FundingTypeOneAmountValueId + "\" > </span>"
                                       + "<input type=\"hidden\" id=\"" + _Row_EnclosureValueId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_BaseAnnualizedAmountId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_AdditionalCommentOneId + "\">"
                                       + "<input type=\"hidden\" id=\"" + _Row_AdditionalCommentTwoId + "\">" +
                               "</td>" +
                                "<td><input type=\"button\" class=\"btn btn-info\" value=\"Edit\" onClick=\"EditRow(" + _NextRowId + ")\"></td>" +
                                "<td><input type=\"button\" class=\"btn btn-danger\" value=\"Delete\" onClick=\"DeleteRow(" + _NextRowId + ")\"></td>" +
                                "</tr>";

    $('#FS_Table > tbody:last').append(_NewRowContent);

    // First Column
    $("#" + _Row_NameId).val("Ministry " + item.lineNo);
    $("#" + _Row_HspTextId).text(item.hspId_DisplayText);
    $("#" + _Row_HspValueId).val(item.hspId);

    

    // Second Column
    $("#" + _Row_FundingTypeOneTextId).text(item.fundingTypeId_DisplayText);
    $("#" + _Row_FundingTypeOneValueId).val(item.fundingTypeId);
    $("#" + _Row_FiscalYearValueId).val(item.fiscalYear);
    $("#" + _Row_ProgramValueId).val(item.programId);
    $("#" + _Row_SectorValueId).val(item.sectorId);
    $("#" + _Row_SectorTextId).val(item.sectorId_DisplayText);
    // Set LHIN Lead
    var _FS_TCLHINLeadId = $("#TCLHINLeadId").val();

    if (_FS_TCLHINLeadId != '' && _FS_TCLHINLeadId != null)
    {
        $("#" + _Row_TclhinLeadValueId).val(_FS_TCLHINLeadId);
   
    } else {
        $("#" + _Row_TclhinLeadValueId).val(item.lhinLeadId);
    }
   

    $("#" + _Row_TpbeTextId).val(item.tpbeId_DisplayText);
    $("#" + _Row_TpbeValueId).val(item.tpbeId);

    $("#" + _Row_FundingTypeTwoTextId).text(item.fundingTypeSecondId_DisplayText);
    $("#" + _Row_FundingTypeTwoValueId).val(item.fundingTypeSecondId);

    var _secondAmount = '';
    if (item.fundingTypeSecondAmountText != '' && item.fundingTypeSecondAmountText != null)
    {
        _secondAmount = ToCurrencyFormat(item.fundingTypeSecondAmountText);
    }

    $("#" + _Row_FundingTypeTwoAmountValueId).val(_secondAmount);

    $("#" + _Row_DeliverableValueId).val(item.deliverable);



    // Third Column
    var _firstAmount = '';
    if (item.fundingTypeAmountText != '' && item.fundingTypeAmountText != null)
    {
        _firstAmount =  ToCurrencyFormat(item.fundingTypeAmountText);
    }
   

    // $("#" + _FundingTypeAmount_ValueID).text(item.fundingTypeAmountText);
    $("#" + _Row_FundingTypeOneAmountValueId).text(_firstAmount);


    $("#" + _Row_EnclosureValueId).val(item.enclosure);

    var _baseAnnualizedAmount = '';
    if (item.baseAnnualizedAmountText != '' && item.baseAnnualizedAmountText != null) {
        _baseAnnualizedAmount = ToCurrencyFormat(item.baseAnnualizedAmountText);
    }
    $("#" + _Row_BaseAnnualizedAmountId).val(_baseAnnualizedAmount);

    $("#" + _Row_AdditionalCommentOneId).val(item.additionalCommentOne);
    $("#" + _Row_AdditionalCommentTwoId).val(item.additionalCommentTwo);

    // Fourth Column
 
   
}


function BuildImported_ErrorFundingSourceTable(item)
{
    // console.log("Invalid :" + item.lineNo);
    var _errorMessage = "";
    for (var i = 0; i < item.lineResult.errorContent.length; i++)
    {
        var _lineItem = item.lineResult.errorContent[i];
        _errorMessage += "Field ID      : " + _lineItem["fieldID"] + '<br />';
        _errorMessage += "Error Message : " + _lineItem["errorMessage"] + '<br /> <br />';
    }

    var _NewRowContent = "<tr> " +
                             "<td>" + item.lineNo   + "</td>" +
                             "<td>" + _errorMessage + "</td>" +
                          "</tr>";

    $('#errorTB > tbody:last').append(_NewRowContent);

    $("#errorTB").show();
}


function RefreshSectorIdBy_HSPId(hspId_Value, sectorId_Value)
{
  
    $('#FS_SectorID').empty();
    $('#FS_TPBEID').empty();
    $.ajax({
        url: '/api/AccountTPBEApi/GetSectors_ByAccountId/',
        type: 'POST',
        data: JSON.stringify({ accountId : hspId_Value }),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $('#FS_SectorID').append("<option value=''> Select ... </option>");
            for (var i = 0 ; i < data.length; i++) {
                $('#FS_SectorID').append("<option value='" + data[i].sectorId + "'>" + data[i].shortDescription + "</option>");
            }
            $('#FS_SectorID').val(sectorId_Value);
        },
    });  
}


function RefreshTPBEIdBy_SecotrId(sectorId_Value, accountId_Value, tpbeId_Value)
{
    $('#FS_TPBEID').empty();
   
    $.ajax({
        url: '/api/TPBEApi/GetTPBEs_BySectorId/',
        type: 'POST',
        data: JSON.stringify({ sectorId: sectorId_Value, accountId: accountId_Value }),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $('#FS_TPBEID').append("<option value=''> Select ... </option>");
            for (var i = 0 ; i < data.length; i++) {
                $('#FS_TPBEID').append("<option value='" + data[i].tpbeId + "'>" + data[i].tpbeDescription + "</option>");
            }
            $('#FS_TPBEID').val(tpbeId_Value);
        },
    });

}



function ToCurrencyFormat(n)
{
    return parseFloat(n).toFixed(2).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}


function findDuplicates(data) {

    var result = [];

    data.forEach(function (element, index) {

        // Find if there is a duplicate or not
        if (data.indexOf(element, index + 1) > -1) {

            // Find if the element is already in the result array or not
            if (result.indexOf(element) === -1) {
                result.push(element);
            }
        }
    });

    return result;
}