// gloable variables
var _gCurrentFundingDetailId = "";
var _gCurrentUserId = "";
var _gFiscalYear = "";
var _gCurrentReportTemplateId = "";
var _gSectionType_Deliverable = "";
var _gSectionType_Milestone = "";
var _gSectionType_KeyPerformanceIndicator = "";
var _gSectionType_KPI = "";
var _gSectionType_AdHoc = "";
var _gSheetHeaderDivPrefix = "sheetHeaderDiv_";
var _gSheetHeaderDivOlPrefix = "sheetHeaderDivOl_";
var _gSheetFooterDivPrefix = "sheetFooterDiv_";
var _gSheetFooterDivOlPrefix = "sheetFooterDivOl_";
var _gSheetDeliverableSectionDivPrefix = "sheetDeliverableSectionDiv_";
var _gSheetMilestoneSectionDivPrefix = "sheetMilestoneSectionDiv_";
var _gSheetKeyPerformanceIndicatorSectionDivPrefix = "sheetKeyPerIndicatorSectionDiv_";
var _gSheetKPISectionDivPrefix = "sheetKPISectionDiv_";
var _gSheetAdHocSectionDivPreifx = "sheetAdHocSectionDiv_";
var _gReportTemplateObj = {};


$(document).ready(function () {

    _gCurrentFundingDetailId = $("#fundingDetailId").val();
    _gCurrentUserId = $("#currentUserId").val();
    _gFiscalYear = $("#fiscalYear").val();
    _gCurrentReportTemplateId = $("#reportTemplateId").val();

    console.log("CurrentFundingDetailId:" + _gCurrentFundingDetailId + " CurrenUserId:" + _gCurrentUserId + "  FiscalYear:" + _gFiscalYear + " ReportTemplateID:" + _gCurrentReportTemplateId);


    _gSectionType_Deliverable = $("#sectionType_Deliverable").val();
    _gSectionType_Milestone = $("#sectionType_Milestone").val();
    _gSectionType_KeyPerformanceIndicator = $("#sectionType_KeyPerformanceIndicator").val();
    _gSectionType_KPI = $("#sectionType_KPI").val();
    _gSectionType_AdHoc = $("#sectionType_AdHoc").val();

    _gReportFrequency_OneTime = $("#reportFrequency_OneTime").val();
    _gReportFrequency_Monthly = $("#reportFrequency_Monthly").val();
    _gReportFrequency_Quarterly = $("#reportFrequency_Quarterly").val();
    _gReportFrequency_Annually = $("#reportFrequency_Annually").val();

    _gDataType_Text = $("#dataType_Text").val();
    _gDataType_Numeric = $("#dataType_Numeric").val();
    _gDataType_Decimal = $("#dataType_Decimal").val();
    _gDataType_Date = $("#dataType_Date").val();


    //ajax_ReportApi_GetReportTemplateInstance_ByFundingDetailId(_gCurrentFundingDetailId);

    if (_gCurrentFundingDetailId > 0 && _gCurrentReportTemplateId > 0) {
        Preview_GetTemplate_Begin(_gCurrentFundingDetailId, _gCurrentReportTemplateId);
    }

});

function Preview_GetTemplate_Begin(fundingDetailId, reportTemplateId) {

    console.log("Preview_GetTemplate_Begin() fundingDetailId = " + fundingDetailId + ", reportTemplateId = " + reportTemplateId);

    $.ajax({
        url: '/api/ReportTemplateApi/GetPreviewTemplate/',
        type: 'POST',
        data: JSON.stringify({ fundingLetterReport_FundingDetailId: fundingDetailId }),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, xhr) {

            console.log(" GetReportTemplateInstance_ByFundingDetailId()  call back data below");
            console.log(data);

            if (data.isExecuteSuccess == "1") {
                _gReportTemplateObj = data.returnResult;
                ReportTemplate_DisplayReportTitle(_gReportTemplateObj);
            } else {
                showModalAlert("Funding Letter Report Template", "Get funding letter report template  with server error,  try again later ....");
                console.log(data.errorMessage);
                console.log(data.errorDetailMessage);
            }

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$("#HospitalRevenueLineModal_TargetMessage").html(err.message);
            //$("#HospitalRevenueLineModal_TargetMessage").addClass("text-danger");
            // console.warn("/api/ReportTemplateApi/SaveTemplate/" + err.message);
            console.warn("/api/ReportApi/GetReportTemplateInstance_ByFundingDetailId/" + err.message);
            showModalAlert("Funding Letter Report Template Failed", "Please close modal window , try again later ...");
        }
    });
}

function showModalAlert(modalHeaderMessage, modalBodyMessage) {

    var defaultModalHeaderMessage = "Alert";
    if (modalHeaderMessage != null && modalHeaderMessage != "") {
        defaultModalHeaderMessage = modalHeaderMessage;
    }

    var defaultModalBodyMessage = "";
    if (modalBodyMessage != null && modalBodyMessage != "") {
        defaultModalBodyMessage = modalBodyMessage;
    }

    $("#ModalAlert_ModalTitle").text(defaultModalHeaderMessage);
    $("#ModalAlert_ModalBody").html(defaultModalBodyMessage);

    $("#ModalAlert").modal('show');
}

function ReportTemplate_DisplayReportTitle(reportTemplateObj) {

    $("#ReportTitle").val(reportTemplateObj.reportTitle);

    $("#ReportingFrequencyDDL").val(reportTemplateObj.reportFrequency);

    if (reportTemplateObj.reportDueDate != null && reportTemplateObj.reportDueDate != "") {
        // reportDueDate = 2021-07-17T00:00:00
        var _tempDateParts = reportTemplateObj.reportDueDate.split('T');
        var _tempDateStr = _tempDateParts[0];
        var _datePartArr = _tempDateStr.split('-');
        var _dueDate = _datePartArr[1] + '/' + _datePartArr[2] + '/' + _datePartArr[0];

        $("#OneTimeDateTxt").val(_dueDate);
    }


    for (var i = 0; i < reportTemplateObj.sheets.length; i++) {

        var _sheetObj = reportTemplateObj.sheets[i];

        var _isActiveTab = 0;

        _isActiveTab = (i == 0) ? 1 : 0;

        ReportTemplate_BuildSheet(_sheetObj, _isActiveTab);
    }
}

function ReportTemplate_BuildSheet(sheetObj, isActiveSheet) {

    console.log("ReportTemplate_BuildSheet() was called .");
    console.log(sheetObj.sheetID + ",  " + sheetObj.sheetName + ",  " + sheetObj.sheetTitle + " , " + isActiveSheet);

    var _sheetName = "";
    _sheetName = sheetObj.sheetName;

    if (sheetObj.sheetName != null && sheetObj.sheetName != "") {
        if (sheetObj.sheetName.length > 20) {
            _sheetName = sheetObj.sheetName.substring(0, 20);
        }
    }

    var _hrefValue = "#" + sheetObj.sheetID;
    var _tabHeaderliClass = "";
    var _tablConentDivClass = "";

    if (isActiveSheet == "1") {
        _tabHeaderliClass = "active";
        _tablConentDivClass = "tab-pane fade in active";

    } else {
        _tabHeaderliClass = "";
        _tablConentDivClass = "tab-pane fade";
    }


    var _appendTabHeaderli = `<li role="presentation" class="${_tabHeaderliClass}">
            <a href="${_hrefValue}" aria-control="${sheetObj.sheetID}" role="tab" data-toggle="tab" title="${sheetObj.sheetName}"> ${_sheetName} </a>
         </li>
        `;

    $("#tabHeaderContainer").append(_appendTabHeaderli);


    var _headerDivId = _gSheetHeaderDivPrefix + sheetObj.sheetID;
    var _headerOlId = _gSheetHeaderDivOlPrefix + sheetObj.sheetID;
    var _footerDivId = _gSheetFooterDivPrefix + sheetObj.sheetID;
    var _footerOlId = _gSheetFooterDivOlPrefix + sheetObj.sheetID;

    var _deliverableSectionDivId = _gSheetDeliverableSectionDivPrefix + sheetObj.sheetID;
    var _milestoneSectionDivId = _gSheetMilestoneSectionDivPrefix + sheetObj.sheetID;
    var _keyPerformanceIndicatorDivId = _gSheetKeyPerformanceIndicatorSectionDivPrefix + sheetObj.sheetID;
    var _kpiDivId = _gSheetKPISectionDivPrefix + sheetObj.sheetID;
    var _adHocDivId = _gSheetAdHocSectionDivPreifx + sheetObj.sheetID;


    var _appendTabContent = `<div role="tabpanel" class="${_tablConentDivClass}" id="${sheetObj.sheetID}">
                              <h3> ${sheetObj.sheetTitle} </h3> </br/>

                              <div id="${_headerDivId}">
                                <ol id="${_headerOlId}">
                                </ol>
                              </div> <br />

                              <div id="${_deliverableSectionDivId}">
                              </div> <br />

                             <div id="${_milestoneSectionDivId}">
                             </div> <br />

                             <div id="${_keyPerformanceIndicatorDivId}">
                             </div> <br />

                             <div id="${_kpiDivId}">
                             </div> <br />

                             <div id="${_adHocDivId}">
                             </div> <br />

                              <div id="${_footerDivId}">
                                <ol id="${_footerOlId}">
                                </ol>
                              </div> <br />

                     </div>
           `;

    $("#tabContentContainer").append(_appendTabContent);

    console.log("ReportTemplate_BuildSheet() was end .");


    ReportTemplate_BuildSheet_Headers(sheetObj);

    ReportTemplate_BuildSheet_Footers(sheetObj);

    ReportTemplate_BuildSheet_DeliverableSection(sheetObj);

    ReportTemplate_BuildSheet_MilestoneSection(sheetObj);

    ReportTemplate_BuildSheet_KeyPerformanceIndicatorSection(sheetObj);

    ReportTemplate_BuildSheet_KPISection(sheetObj);

    ReportTemplate_BuildSheet_AdHocSection(sheetObj);
}

function ReportTemplate_BuildSheet_Headers(sheetObj) {

    var _sheetHeaderOlId = _gSheetHeaderDivOlPrefix + sheetObj.sheetID;

    if (sheetObj.sheetHeaders.length > 0) {
        for (var i = 0; i < sheetObj.sheetHeaders.length; i++) {
            $("#" + _sheetHeaderOlId).append("<li>" + sheetObj.sheetHeaders[i].sheetHeader_Text + "</li>");
        }
    }

}

function ReportTemplate_BuildSheet_Footers(sheetObj) {
    var _sheetfooterOlId = _gSheetFooterDivOlPrefix + sheetObj.sheetID;

    if (sheetObj.sheetFooters.length > 0) {
        for (var i = 0; i < sheetObj.sheetFooters.length; i++) {
            $("#" + _sheetfooterOlId).append("<li>" + sheetObj.sheetFooters[i].sheetFooter_Text + "</li>");
        }
    }

}

function ReportTemplate_BuildSheet_DeliverableSection(sheetObj) {

    var _deliverableSectionId = _gSheetDeliverableSectionDivPrefix + sheetObj.sheetID;

    var _deliverableSectionObj = null;

    if (sheetObj.deliverableSection != null) {
        _deliverableSectionObj = sheetObj.deliverableSection;
    }
    else {
        return;
    }

    var _deliverableSectionName = "";
    if (_deliverableSectionObj.sectionName != null && _deliverableSectionObj.sectionName != "") {
        _deliverableSectionName = _deliverableSectionObj.sectionName;
    }

    var _deliverableSectionTitle = "";
    if (_deliverableSectionObj.sectionTitle != null && _deliverableSectionObj.sectionTitle != "") {
        _deliverableSectionTitle = _deliverableSectionObj.sectionTitle;
    }

    var _sectionName = "<h4>Deliverable Section Name:  " + _deliverableSectionName + "</h4> ";
    var _sectionTitle = "<h4>Deliverable Section Title: " + _deliverableSectionTitle + "</h4>";


    $("#" + _deliverableSectionId).append(_sectionName);
    $("#" + _deliverableSectionId).append(_sectionTitle);


    var _deliverableSectionTableId = "deliverableSectionTableId_" + sheetObj.sheetID;
    var _deliverableSectionTableBodyId = "deliverableSectionTableBodyId_" + sheetObj.sheetID;

    var _deliverableTable = `
        <table class="table table-bordered" id="${_deliverableSectionTableId}" >
            <thead class="thead-dark">
                <tr>
                        <th> Deliverable   </th>
                        <th> HSP Comment   </th>
                </tr>
            </thead>
            <tbody id="${_deliverableSectionTableBodyId}">
             
       
            </tbody>
        </table>
    `;

    $("#" + _deliverableSectionId).append(_deliverableTable);


    var _deliverableCol1 = "  ";
    var _deliverableCol2 = "";


    var _trLine = `<tr>
                        <td> ${_deliverableCol1}  </td>
                        <td> ${_deliverableCol2}  </td>
            </tr>
        `;

    $("#" + _deliverableSectionTableBodyId).append(_trLine);


    // Deliverable Notes
    if (_deliverableSectionObj.notes.length > 0) {
        $("#" + _deliverableSectionId).append("<h4>Deliverable Notes </h4>");

        var _deliverableUlNotesId = "DiverableNotesUl_" + sheetObj.sheetID;

        var _ul = `<ul id = "${_deliverableUlNotesId}"> </ul>`;

        $("#" + _deliverableSectionId).append(_ul);

        for (var i = 0; i < _deliverableSectionObj.notes.length; i++) {
            var _noteObj = _deliverableSectionObj.notes[i];
            if (_noteObj.noteText != null && _noteObj.noteText != "" && _noteObj.noteText != " ") {
                $("#" + _deliverableUlNotesId).append("<li>" + _noteObj.noteText + "</li>");

                console.log("Notes: " + _noteObj.noteText);
            }
        }
    }
}

function ReportTemplate_BuildSheet_MilestoneSection(sheetObj) {

    var _milestonSectionId = _gSheetMilestoneSectionDivPrefix + sheetObj.sheetID;

    var _milestonSectionObj = null;
    if (sheetObj.milestoneSection != null) {
        _milestonSectionObj = sheetObj.milestoneSection;
    }
    else {
        return;
    }

    var _milestoneSectionName = "";
    if (_milestonSectionObj.sectionName != null && _milestonSectionObj.sectionName != "") {
        _milestoneSectionName = _milestonSectionObj.sectionName;
    }

    var _milestoneSectionTitle = "";
    if (_milestonSectionObj.sectionTitle != null && _milestonSectionObj.sectionTitle != "") {
        _milestoneSectionTitle = _milestonSectionObj.sectionTitle;
    }


    var _sectionName = "<h4>Milestone Section Name: " + _milestoneSectionName + "</h4> ";
    var _sectionTitle = "<h4>Milestone Section Title: " + _milestoneSectionTitle + "</h4>";

    $("#" + _milestonSectionId).append(_sectionName);
    $("#" + _milestonSectionId).append(_sectionTitle);


    var _milestonSectionTableId = "milestoneSectionTableId_" + sheetObj.sheetID;
    var _milestoneSectionTableBodyId = "milestoneSectionTableBodyId_" + sheetObj.sheetID;

    var _milestoneTable = `
            <table class="table table-bordered" id="${_milestonSectionTableId}" >
                <thead class="thead-dark">
                    <tr>
                            <th> Milestone  </th>
                            <th> Start Date   </th>
                            <th> Estimated % Complete   </th>
                            <th> Actual Completion Date   </th>
                            <th> Comments   </th>
                    </tr>
                </thead>
                <tbody id="${_milestoneSectionTableBodyId}">
                </tbody>
            </table>
        `;

    $("#" + _milestonSectionId).append(_milestoneTable);

    var _milestoneCol1 = "  ";
    var _milestoneCol2 = "";
    var _milestoneCol3 = "";
    var _milestoneCol4 = "";
    var _milestoneCol5 = "";



    var _trLine = `<tr>
                        <td> ${_milestoneCol1} </td>
                        <td> ${_milestoneCol2} </td>
                        <td> ${_milestoneCol3} </td>
                        <td> ${_milestoneCol4} </td>
                        <td> ${_milestoneCol5} </td>
                </tr>
                `;

    $("#" + _milestoneSectionTableBodyId).append(_trLine);



    // Milestone Notes
    if (_milestonSectionObj.notes.length > 0) {
        $("#" + _milestonSectionId).append("<h4>Milesone Notes </h4>");

        var _milestoneUlNotesId = "MilestoneNotesUl_" + sheetObj.sheetID;

        var _ul = `<ul id = "${_milestoneUlNotesId}"> </ul>`;

        $("#" + _milestonSectionId).append(_ul);

        for (var i = 0; i < _milestonSectionObj.notes.length; i++) {
            var _noteObj = _milestonSectionObj.notes[i];
            if (_noteObj.noteText != null && _noteObj.noteText != "" && _noteObj.noteText != " ") {
                $("#" + _milestoneUlNotesId).append("<li>" + _noteObj.noteText + "</li>");

                console.log("Notes: " + _noteObj.noteText);
            }
        }
    }
}

function ReportTemplate_BuildSheet_KeyPerformanceIndicatorSection(sheetObj) {

    var _keyPerformanceIndicatorSectionId = _gSheetKeyPerformanceIndicatorSectionDivPrefix + sheetObj.sheetID;

    var _keyPerformanceIndicatorSectionObj = null;
    if (sheetObj.keyPerIndicatorSection != null) {
        _keyPerformanceIndicatorSectionObj = sheetObj.keyPerIndicatorSection;
    }
    else {
        return;
    }

    var _keyPerformanceIndicatorSectionName = "";
    if (_keyPerformanceIndicatorSectionObj.sectionName != null && _keyPerformanceIndicatorSectionObj.sectionName != "") {
        _keyPerformanceIndicatorSectionName = _keyPerformanceIndicatorSectionObj.sectionName;
    }

    var _keyPerformanceIndicatorSectionTitle = "";
    if (_keyPerformanceIndicatorSectionObj.sectionTitle != null && _keyPerformanceIndicatorSectionObj.sectionTitle != "") {
        _keyPerformanceIndicatorSectionTitle = _keyPerformanceIndicatorSectionObj.sectionTitle;
    }

    var _sectionName = "<h4>Key Performance Indicator Section Name: " + _keyPerformanceIndicatorSectionName + "</h4> ";
    var _sectionTitle = "<h4>Key Performance Indicator Section Title: " + _keyPerformanceIndicatorSectionTitle + "</h4>";

    $("#" + _keyPerformanceIndicatorSectionId).append(_sectionName);
    $("#" + _keyPerformanceIndicatorSectionId).append(_sectionTitle);


    var _keyPerIndSectionTableId = "keyPerformanceIndicatorSectionTableId_" + sheetObj.sheetID;
    var _keyPerIndSectionTableBodyId = "keyPerformanceIndicatorSectionTableBodyId_" + sheetObj.sheetID;

    var _kpiTable = `
            <table class="table table-bordered" id="${_keyPerIndSectionTableId}" >
                <thead class="thead-dark">
                    <tr>
                            <th> Performance Indicator  </th>
                            <th> Base Line   </th>
                            <th> Progress so for  </th>
                            <th> Target  </th>
                            <th> Comments   </th>
                    </tr>
                </thead>
                <tbody id="${_keyPerIndSectionTableBodyId}">
                </tbody>
            </table>
        `;

    $("#" + _keyPerformanceIndicatorSectionId).append(_kpiTable);


    var _kpiCol1 = "  ";
    var _kpiCol2 = "";
    var _kpiCol3 = "";
    var _kpiCol4 = "";
    var _kpiCol5 = "";


    var _trLine = `<tr>
                        <td> ${_kpiCol1} </td>
                        <td> ${_kpiCol2} </td>
                        <td> ${_kpiCol3}  </td>
                        <td> ${_kpiCol4} </td>
                        <td> ${_kpiCol5} </td>
                </tr>
                `;

    $("#" + _keyPerIndSectionTableBodyId).append(_trLine);

    // KPI Notes
    if (_keyPerformanceIndicatorSectionObj.notes.length > 0) {
        $("#" + _keyPerformanceIndicatorSectionId).append("<h4>Key Performance Indicator Notes </h4>");

        var _kpiUlNotesId = "KeyPerformanceIndicatorNotesUl_" + sheetObj.sheetID;

        var _ul = `<ul id = "${_kpiUlNotesId}"> </ul>`;

        $("#" + _keyPerformanceIndicatorSectionId).append(_ul);

        for (var i = 0; i < _keyPerformanceIndicatorSectionObj.notes.length; i++) {
            var _noteObj = _keyPerformanceIndicatorSectionObj.notes[i];

            if (_noteObj.noteText != null && _noteObj.noteText != "" && _noteObj.noteText != " ") {
                $("#" + _kpiUlNotesId).append("<li>" + _noteObj.noteText + "</li>");

                console.log("Notes: " + _noteObj.noteText);
            }
        }
    }
}

function ReportTemplate_BuildSheet_KPISection(sheetObj) {

    var _kpiSectionId = _gSheetKPISectionDivPrefix + sheetObj.sheetID;

    var _kpiSectionObj = null;
    if (sheetObj.kpiSection != null) {
        _kpiSectionObj = sheetObj.kpiSection;
    }
    else {
        return;
    }


    var _kpiSectionName = "";
    if (_kpiSectionObj.sectionName != null && _kpiSectionObj.sectionName != "") {
        _kpiSectionName = _kpiSectionObj.sectionName;
    }


    var _kpiSectionTitle = "";
    if (_kpiSectionObj.sectionTitle != null && _kpiSectionObj.sectionTitle != "") {
        _kpiSectionTitle = _kpiSectionObj.sectionTitle;
    }


    var _sectionName = "<h4> KPI Section Name: " + _kpiSectionName + "</h4> ";
    var _sectionTitle = "<h4> KPI Section Title: " + _kpiSectionTitle + "</h4>";

    $("#" + _kpiSectionId).append(_sectionName);
    $("#" + _kpiSectionId).append(_sectionTitle);


    var _kpiSectionTableId = "KPISectionTableId_" + sheetObj.sheetID;
    var _kpiSectionTableBodyId = "KPISectionTableBodyId_" + sheetObj.sheetID;

    var _kpiTable = `
            <table class="table table-bordered" id="${_kpiSectionTableId}" >
                <thead class="thead-dark">
                    <tr>
                            <th> Program  </th>
                            <th> Category  </th>
                            <th> Sub Category  </th>
                            <th> Clinical Activity  </th>
                            <th> Unit of Measure   </th>
                            <th> Beginning Volume   </th>
                            <th> In-year incre Volume   </th>
                            <th> Closing Balance   </th>
                            <th> Actual Volume   </th>
                    </tr>
                </thead>
                <tbody id="${_kpiSectionTableBodyId}">
                </tbody>
            </table>
        `;

    $("#" + _kpiSectionId).append(_kpiTable);


    var _kpiCol1 = "  ";
    var _kpiCol2 = "";
    var _kpiCol3 = "";
    var _kpiCol4 = "";
    var _kpiCol5 = "";
    var _kpiCol6 = "";
    var _kpiCol7 = "";
    var _kpiCol8 = "";
    var _kpiCol9 = "";

    var _trLine = `<tr>
                        <td> ${_kpiCol1} </td>
                        <td> ${_kpiCol2} </td>
                        <td> ${_kpiCol3} </td>
                        <td> ${_kpiCol4} </td>
                        <td> ${_kpiCol5} </td>
                        <td> ${_kpiCol6} </td>
                        <td> ${_kpiCol7} </td>
                        <td> ${_kpiCol8} </td>
                        <td> ${_kpiCol9} </td>
                </tr>
                `;

    $("#" + _kpiSectionTableBodyId).append(_trLine);


    // KPI Notes
    if (_kpiSectionObj.notes.length > 0) {
        $("#" + _kpiSectionId).append("<h4> KPI Notes </h4>");

        var _kpiUlNotesId = "KPINotesUl_" + sheetObj.sheetID;

        var _ul = `<ul id = "${_kpiUlNotesId}"> </ul>`;

        $("#" + _kpiSectionId).append(_ul);

        for (var i = 0; i < _kpiSectionObj.notes.length; i++) {
            var _noteObj = _kpiSectionObj.notes[i];

            if (_noteObj.noteText != null && _noteObj.noteText != "" && _noteObj.noteText != " ") {
                $("#" + _kpiUlNotesId).append("<li>" + _noteObj.noteText + "</li>");
            }
        }
    }
}

function ReportTemplate_BuildSheet_AdHocSection(sheetObj) {

    var _adHocSectionId = _gSheetAdHocSectionDivPreifx + sheetObj.sheetID;

    var _adHocSectionObj = null;
    if (sheetObj.adHocSections != null && sheetObj.adHocSections.length > 0) {
        _adHocSectionObj = sheetObj.adHocSections;
    }
    else {
        return;
    }

    for (var ad = 0; ad < _adHocSectionObj.length; ad++) {
        var adHoc = _adHocSectionObj[ad];

        var _adHocSectionName = "";
        if (adHoc.sectionName != null && adHoc.sectionName != "") {
            _adHocSectionName = adHoc.sectionName;
        }

        var _adHocSectionTitle = "";
        if (adHoc.sectionTitle != null && adHoc.sectionTitle != "") {
            _adHocSectionTitle = adHoc.sectionTitle;
        }

        var _sectionName = "<h4> Ad Hoc Section Name: " + _adHocSectionName + "</h4> ";
        var _sectionTitle = "<h4>Ad Hoc Section Title: " + _adHocSectionTitle + "</h4>";

        $("#" + _adHocSectionId).append(_sectionName);
        $("#" + _adHocSectionId).append(_sectionTitle);


        console.log("SectionName : " + _sectionName + ", SectionTitle : " + _sectionTitle);


        var _maxColNumber = AdHoc_Cells_GetMaxColNumber(adHoc.trRows);
        var _maxRowNumber = AdHoc_Cells_GetMaxRowNumber(adHoc.trRows);

        console.log("AdHoc Max Row = " + _maxRowNumber + " Max Col = " + _maxColNumber);


        var _adHocSectionTableId = "AdHocSectionTableId_" + sheetObj.sheetID + "_" + ad;
        var _adHocSectionTableBodyId = "AdHocSectionTableBodyId_" + sheetObj.sheetID + "_" + ad;




        //var _adHocTable = `
        //    <table class="table table-bordered" id="${_adHocSectionTableId}" >
        //        <thead class="thead-dark">
        //            <tr>`
        //for (var i = 0; i < _maxColNumber; i++) {
        //    _adHocTable += `<th> Column ${i + 1}</th>`
        //}

        //_adHocTable +=
        //    ` </tr>
        //        </thead>
        //        <tbody id="${_adHocSectionTableBodyId}">
        //        </tbody>
        //    </table>
        //`;

        var _adHocTable = `
            <table class="table table-bordered" id="${_adHocSectionTableId}" >`


        _adHocTable +=
            ` <tbody id="${_adHocSectionTableBodyId}">
                </tbody>
            </table>
        `;




        $("#" + _adHocSectionId).append(_adHocTable);

        console.log("_adHocSectionTableBodyId = " + _adHocSectionTableBodyId);

        var _trLine = "";
        var _trRow = adHoc.trRows;
        for (var i = 0; i < _maxRowNumber; i++) {
            var rowIndex = i + 1;
            _trLine += `<tr>`;

            for (var j = 0; j < _maxColNumber; j++) {
                var columnIndex = j + 1;
                for (var k = 0; k < _trRow.length; k++) {
                    if (_trRow[k].columnNumber == columnIndex && _trRow[k].rowNumber == rowIndex) {
                        _trLine += `<td> ${_trRow[k].valueText}</td>`;
                        break;
                    }
                }
            }

            _trLine += `</tr>`;

        }
        $("#" + _adHocSectionTableBodyId).append(_trLine);

        console.log("_trLine : " + _trLine);

    }

    return;
}

function AdHoc_Cells_GetMaxColNumber(trRows) {
    var maxColNumber = 1;
    maxColNumber = parseInt(maxColNumber);

    for (var i = 0; i < trRows.length; i++) {
        var reportCellObj = trRows[i];
        if (reportCellObj.columnNumber != null && reportCellObj.columnNumber != "") {
            var tempColNo = parseInt(reportCellObj.columnNumber);
            if (tempColNo > maxColNumber) {
                maxColNumber = tempColNo;
            }
        }
    }
    return maxColNumber;
}

function AdHoc_Cells_GetMaxRowNumber(trRows) {

    var maxRowNumber = 1;
    maxRowNumber = parseInt(maxRowNumber);

    for (var i = 0; i < trRows.length; i++) {
        var reportCellObj = trRows[i];
        if (reportCellObj.rowNumber != null && reportCellObj.rowNumber != "") {
            var tempRowNo = parseInt(reportCellObj.rowNumber);
            if (tempRowNo > maxRowNumber) {
                maxRowNumber = tempRowNo;
            }
        }
    }
    return maxRowNumber;
}




