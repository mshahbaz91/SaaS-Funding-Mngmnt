

// gloable variables
var _gCurrentFundingDetailId = "";
var _gCurrentUserId = "";
var _gFiscalYear = "";
var _gCurrentReportTemplateId = "";

var _gReportTemplate_InputTextBox_MaxLength = 250;
var _gReportTemplate_InputTextBox_AdHoc_MaxLength = 2000;


var _gSectionType_Deliverable = "";
var _gSectionType_Milestone = "";
var _gSectionType_KeyPerformanceIndicator = "";
var _gSectionType_KPI = "";
var _gSectionType_AdHoc = "";

var _gReportFrequency_OneTime = "";
var _gReportFrequency_Monthly = "";
var _gReportFrequency_Quarterly = "";
var _gReportFrequency_Annually = "";

var _gDataType_Text = "";
var _gDataType_Numeric = "";
var _gDataType_Decimal = "";
var _gDataType_Date = "";


var _gPanelContainerDivId = "PanelContainerDiv"

// prefix variables
var _gPanelIdPrefix = "panelId_";

var _gPanelDeleteBtnIdPrefix = "panelDeleteBtnId_";
var _gPanelSheetNameIdPrefix = "panelSheetNameId_";
var _gPanelSheetNameMessageSpanIdPrefix = "panelSheetNameMessageSpanId_";
var _gPanelSheetTitleIdPrefix = "panelSheetTitleId_";
var _gPanelSheetTitleMessageSpanIdPrefix = "panelSheetTitleMessageSpanId_";
var _gPanelHeaderContainerDivIdPrefix = "panelHederContainerDivId_";
var _gPanelFooterContainerDivIdPrefix = "panelFooterContainerDivId_";
var _gPanelAddHeaderBtnIdPrefix = "panelAddHeaderBtnId_";
var _gPanelAddFooterBtnIdPrefix = "panelAddFooterBtnId_";
var _gPanelSectionDropDownListIdPrefix = "panelSectionDropDownListId_";
var _gPanelAddSectionBtnIdPrefix = "panelAddSectionBtnId_";
var _gPanelDeliverableSectionContainerDivIdPrefix = "panelDeliverableSectionContainerDivId_";
var _gPanelMilestoneSectionContainerDivIdPrefix = "panelMilestoneSectionContainerDivId_";
var _gPanelKeyPerIndicatorSectionContainerDivIdPrefix = "panelKeyPerIndicatorSectionContainerDivId_";
var _gPanelKpiSectionContainerDivIdPrefix = "panelKpiSectionContainerDivId_";
var _gPanelAdSectionContainerDivIdPrefix = "panelAdSectionContainerDivId_";

var _gPanelHeader_RowIdPrefix = "panelHeaderRowId_";
var _gPanelHeader_SequenceNumberIdPefix = "panelHeaderSequenceNumberId_";
var _gPanelHeader_InputTxtIdPrefix = "panelHeaderInputTxtId_";
var _gPanelHeader_InputTxt_SpanMessageIdPrefix = " panleHeaderInputTxtSapnMessageId_";
var _gPanelHeader_RemoveBtnIdPrefix = "panelHeaderRemoveBtnId_";

var _gPanelFooter_RowIdPrefix = "panelFooterRowId_";
var _gPanelFooter_SequenceNumberIdPefix = "panelFooterSequenceNumberId_";
var _gPanelFooter_InputTxtIdPrefix = "panelFooterInputTxtId_";
var _gPanelFooter_InputTxt_SpanMessageIdPrefix = " panleFooterInputTxtSapnMessageId_";
var _gPanelFooter_RemoveBtnIdPrefix = "panelFooterRemoveBtnId_";

var _gDeliverableSectionPanel_RowIdPrefix = "DeliverableSectionPanelRowId_";
var _gDeliverableSectionPanel_DeleteBtnIdPrefix = "DeliverableSectionPanelDeleteBtnId_";
var _gDeliverableSectioPanel_SectionNameIdPrefix = "DeliverableSectioPanelSectionNameId_";
var _gDeliverableSectioPanel_SectionTitleIdPrefix = "DeliverableSectioPanelSectionTitleId_";
var _gDeliverableSectionPanel_AddNoteBtnIdPrefix = "DeliverableSectionPanelAddNoteBtnId_";
var _gDeliverableSectionPanel_NotesContainerDivIdPrefix = "DeliverableSectionPanelNotesContainerDivId_";
var _gDeliverableSectionPanel_NoteRowIdPrefix = "DeliverableSectionPanelNoteRowId_";
var _gDeliverableSectionPanel_NoteSequenceNumberIdPrefix = "DeliverableSectionPanelNoteSequenceNumberId_";

var _gMilestoneSectionPanel_RowIdPrefix = "MilestoneSectionPanelRowId_";
var _gMilestoneSectionPanel_DeleteBtnIdPrefix = "MilestoneSectionPanelDeleteBtnId_";
var _gMilestoneSectionPanel_SectionNameIdPrefix = "MilestoneSectioPanelSectionNameId_";
var _gMilestoneSectionPanel_SectionTitleIdPrefix = "MilestoneSectioPanelSectionTitleId_";
var _gMilestoneSectionPanel_AddNoteBtnIdPrefix = "MilestoneSectionPanelAddNoteBtnId_";
var _gMilestoneSectionPanel_NotesContainerDivIdPrefix = "MilestoneSectionPanelNotesContainerDivId_";
var _gMilestoneSectionPanel_NoteRowIdPrefix = "MilestoneSectionPanelNoteRowId_";
var _gMilestoneSectionPanel_NoteSequenceNumberIdPrefix = "MilestoneSectionPanelNoteSequenceNumberId_";


var _gKeyPerIndicatorSectionPanel_RowIdPrefix = "KeyPerIndicatorSectionPanelRowId_";
var _gKeyPerIndicatorSectionPanel_DeleteBtnIdPrefix = "KeyPerIndicatorSectionPanelDeleteBtnId_";
var _gKeyPerIndicatorSectionPanel_SectionNameIdPrefix = "KeyPerIndicatorSectioPanelSectionNameId_";
var _gKeyPerIndicatorSectionPanel_SectionTitleIdPrefix = "KeyPerIndicatorSectioPanelSectionTitleId_";
var _gKeyPerIndicatorSectionPanel_AddNoteBtnIdPrefix = "KeyPerIndicatorSectionPanelAddNoteBtnId_";
var _gKeyPerIndicatorSectionPanel_NotesContainerDivIdPrefix = "KeyPerIndicatorSectionPanelNotesContainerDivId_";
var _gKeyPerIndicatorSectionPanel_NoteRowIdPrefix = "KeyPerIndicatorSectionPanelNoteRowId_";
var _gKeyPerIndicatorSectionPanel_NoteSequenceNumberIdPrefix = "KeyPerIndicatorSectionPanelNoteSequenceNumberId_";


var _gKpiSectionPanel_RowIdPrefix = "KpiSectionPanelRowId_";
var _gKpiSectionPanel_DeleteBtnIdPrefix = "KpiSectionPanelDeleteBtnId_";
var _gKpiSectionPanel_SectionNameIdPrefix = "KpiSectioPanelSectionNameId_";
var _gKpiSectionPanel_SectionTitleIdPrefix = "KpiSectioPanelSectionTitleId_";
var _gKpiSectionPanel_AddNoteBtnIdPrefix = "KpiSectionPanelAddNoteBtnId_";
var _gKpiSectionPanel_NotesContainerDivIdPrefix = "KpiSectionPanelNotesContainerDivId_";
var _gKpiSectionPanel_NoteRowIdPrefix = "KpiSectionPanelNoteRowId_";
var _gKpiSectionPanel_NoteSequenceNumberIdPrefix = "KpiSectionPanelNoteSequenceNumberId_";


var _gAdSectionPanel_RowIdPrefix = "AdSectionPanelRowId_";
var _gAdSectionPanel_DeleteBtnIdPrefix = "AdSectionPanelDeleteBtnId_";
var _gAdSectionPanel_SectionNameIdPrefix = "AdSectioPanelSectionNameId_";
var _gAdSectionPanel_SectionTitleIdPrefix = "AdSectioPanelSectionTitleId_";
var _gAdSectionPanel_AddNoteBtnIdPrefix = "AdSectionPanelAddNoteBtnId_";
var _gAdSectionPanel_NotesContainerDivIdPrefix = "AdSectionPanelNotesContainerDivId_";
var _gAdSectionPanel_NoteRowIdPrefix = "AdSectionPanelNoteRowId_";


// css Class Variable
var _gSheetPanelClass = "sheetPanelClass";
var _gPanelSequenceClass = "panelSequenceClass";

var _gPanelDeleteBtnClass = "panelDeleteBtnClass";
var _gPanelAddHeaderBtnClass = "panelAddHeaderBtnClass";
var _gPanelAddFooterBtnClass = "panelAddFooterBtnClass";
var _gPanelAddSectionBtnClass = "panelAddSectionBtnClass";

var _gPanelHeader_LabelSpanClassPrefix = "panelHeaderLabelSpanClass_";
var _gPanelHeader_InputTxtClassPrefix = "panelHeaderInputTxtClass_";
var _gpanelHeader_InputTxt_SpanMessageClassPreifx = "panelHeaderInputTxtSpanMessageClass_";
var _gPanelHeader_RemoveBtnClassPrefix = "panelHeaderRemoveBtnClass_";

var _gPanelFooter_LabelSpanClassPrefix = "panelFooterLabelSpanClass_";
var _gPanelFooter_InputTxtClassPrefix = "panelFooterInputTxtClass_";
var _gpanelFooter_InputTxt_SpanMessageClassPreifx = "panelFooterInputTxtSpanMessageClass_";
var _gPanelFooter_RemoveBtnClassPrefix = "panelFooterRemoveBtnClass_";

var _gDeliverableSectionPanelClass = "DeliverableSectionPanelClass";
var _gDeliverableSectionPanel_DeleteBtnClassPrefix = "DeliverableSectionPanelDeleteBtnClass_";
var _gDeliverableSectionPanel_AddNoteBtnClassPrefix = "DeliverableSectionPanelAddNoteBtnClass_";
var _gDeliverableSectionPanel_SectionNameClassPrefix = "DeliverableSectionPanelSectionNameClass_";
var _gDeliverableSectionPanel_SectionTitleClassPrefix = "DeliverableSectionPanelSectionTitleClass_";
var _gDeliverableSectionPanel_SectionNoteInputTxtClassPrefix = "DeliverableSectionPanelSectionNoteInputTxtClass_";
var _gDeliverableSectionPanel_SectionNoteInputTxtClass = "DeliverableSectionPanelSectionNoteInputTxtClass";
var _gDeliverableSectionPanel_RemoveNoteBtnClassPrefix = "DeliverableSectionPanelRemoveNoteBtnClass_";
var _gDeliverableSectionPanel_RemoveNoteBtnClass = "DeliverableSectionPanelRemoveNoteBtnClass";
var _gDeliverableSectionPanel_LabelNoteSpanClass = "DeliverableSectionPanelLabelNoteSpanClass";

var _gMilestoneSectionPanelClass = "MilestoneSectionPanelClass";
var _gMilestoneSectionPanel_DeleteBtnClassPrefix = "MilestoneSectionPanelDeleteBtnClass_";
var _gMilestoneSectionPanel_AddNoteBtnClassPrefix = "MilestoneSectionPanelAddNoteBtnClass_";
var _gMilestoneSectionPanel_SectionNameClassPrefix = "MilestoneSectionPanelSectionNameClass_";
var _gMilestoneSectionPanel_SectionTitleClassPrefix = "MilestoneSectionPanelSectionTitleClass_";
var _gMilestoneSectionPanel_SectionNoteInputTxtClassPrefix = "MilestoneSectionPanelSectionNoteInputTxtClass_";
var _gMilestoneSectionPanel_SectionNoteInputTxtClass = "MilestoneSectionPanelSectionNoteInputTxtClass";
var _gMilestoneSectionPanel_RemoveNoteBtnClassPrefix = "MilestonesSectionPanelRemoveNoteBtnClass_";
var _gMilestoneSectionPanel_RemoveNoteBtnClass = "MilestoneSectionPanelRemoveNoteBtnClass";
var _gMilestoneSectionPanel_LabelNoteSpanClass = "MilestoneSectionPanelLabelNoteSpanClass";

var _gKeyPerIndicatorSectionPanelClass = "KeyPerIndicatorSectionPanelClass";
var _gKeyPerIndicatorSectionPanel_DeleteBtnClassPrefix = "KeyPerIndicatorSectionPanelDeleteBtnClass_";
var _gKeyPerIndicatorSectionPanel_AddNoteBtnClassPrefix = "KeyPerIndicatorSectionPanelAddNoteBtnClass_";
var _gKeyPerIndicatorSectionPanel_SectionNameClassPrefix = "KeyPerIndicatorSectionPanelSectionNameClass_";
var _gKeyPerIndicatorSectionPanel_SectionTitleClassPrefix = "KeyPerIndicatorSectionPanelSectionTitleClass_";
var _gKeyPerIndicatorSectionPanel_SectionNoteInputTxtClassPrefix = "KeyPerIndicatorSectionPanelSectionNoteInputTxtClass_";
var _gKeyPerIndicatorSectionPanel_SectionNoteInputTxtClass = "KeyPerIndicatorSectionPanelSectionNoteInputTxtClass";
var _gKeyPerIndicatorSectionPanel_RemoveNoteBtnClassPrefix = "KeyPerIndicatorSectionPanelRemoveNoteBtnClass_";
var _gKeyPerIndicatorSectionPanel_RemoveNoteBtnClass = "KeyPerIndicatorSectionPanelRemoveNoteBtnClass";
var _gKeyPerIndicatorSectionPanel_LabelNoteSpanClass = "KeyPerIndicatorSectionPanelLabelNoteSpanClass";

var _gKpiSectionPanelClass = "KpiSectionPanelClass";
var _gKpiSectionPanel_DeleteBtnClassPrefix = "KpiSectionPanelDeleteBtnClass_";
var _gKpiSectionPanel_AddNoteBtnClassPrefix = "KpiSectionPanelAddNoteBtnClass_";
var _gKpiSectionPanel_SectionNameClassPrefix = "KpiSectioPanelSectionNameClass_";
var _gKpiSectionPanel_SectionTitleClassPrefix = "KpiSectioPanelSectionTitleClass_";
var _gKpiSectionPanel_SectionNoteInputTxtClassPrefix = "KpiSectioPanelSectionNoteInputTxtClass_";
var _gKpiSectionPanel_SectionNoteInputTxtClass = "KpiSectioPanelSectionNoteInputTxtClass";
var _gKpiSectionPanel_RemoveNoteBtnClassPrefix = "KpiSectionPanelRemoveNoteBtnClass_";
var _gKpiSectionPanel_RemoveNoteBtnClass = "KpiSectionPanelRemoveNoteBtnClass";
var _gKpiSectionPanel_LabelNoteSpanClass = "KpiSectionPanelLabelNoteSpanClass";


var _gAdSectionPanelClass = "AdSectionPanelClass";
var _gAdSectionPanel_DeleteBtnClassPrefix = "AdSectionPanelDeleteBtnClass_";
var _gAdSectionPanel_AddNoteBtnClassPrefix = "AdSectionPanelAddNoteBtnClass_";
var _gAdSectionPanel_SectionNameClassPrefix = "AdSectioPanelSectionNameClass_";
var _gAdSectionPanel_SectionTitleClassPrefix = "AdSectioPanelSectionTitleClass_";
var _gAdSectionPanel_SectionNoteInputTxtClassPrefix = "AdSectioPanelSectionNoteInputTxtClass_";
var _gAdSectionPanel_SectionNoteInputTxtClass = "AdSectioPanelSectionNoteInputTxtClass";
var _gAdSectionPanel_RemoveNoteBtnClassPrefix = "AdSectionPanelRemoveNoteBtnClass_";
var _gAdSectionPanel_RemoveNoteBtnClass = "AdSectionPanelRemoveNoteBtnClass";

var _gAdSectionPanel_NumberRowIdPrefix = "AdSectionPanelNumberRowId_";
var _gAdSectionPanel_NumberColIdPrefix = "AdSectionPanelNumberColId_";
var _gAdSectionPanel_DrawTableBtnIdPrefix = "AdSectionPanelDrawTableBtnId_";
var _gAdSectionPanel_DrawTableBtnClass = "AdSectionPanelDrawTableBtnClass";

var _gAdSectionPanel_AddTableRowBtnIdPrefix = "AdSectionPanelAddTableRowBtnId_";
var _gAdSectionPanel_AddTableRowBtnClass = "AdSectionPanelAddTableRowBtnClass";
var _gAdSectionPanel_RemoveTableRowBtnClass = "AdSectionPanelRemoveTableRowBtnClass";

var _gAdSectionPanel_DrawTableBtnClassPrefix = "AdSectionPanelDrawTableBtnClass_";
var _gAdSectionPanel_TableIdPrefix = "AdSectionPanelTableId_";

var _gAdSectionPanel_DownLoadIconClass = "AdSectionPanelDownloadIconClass";
var _gAdSectionPanel_RemoveIconClass = "AdSectionPanelRemoveIconClass";


// ReportTemplate_VM
var ReportTemplate_VM = {
    FundingDetailID: 0,
    ReportTemplateID: 0,
    FiscalYear: 0,
    ReportTitle: "",
    ReportFrequency: 0,
    ReportDueDateStr: "",
    ReportDueDate: "",
    CurrentUserId: "1",
    ActiveInd: null,
    Sheets: [],
    Deleted: 0
}

class Sheet {
    SheetID;
    SheetSequenceNumber;
    SheetGuid;
    SheetName;
    SheetTitle;
    SheetHeaders = [];
    SheetFooters = [];
    deliverableSection;
    milestoneSection;
    keyPerIndicatorSection;
    kpiSection;
    adHocSections = [];
    Deleted;
}


class SheetHeader {
    SheetHeaderID;
    SheetHeader_SequenceNumber;
    SheetHeader_Text;
    Deleted;
}


class SheetFooter {
    SheetFooterID;
    SheetFooter_SequenceNumber;
    SheetFooter_Text;
    Deleted;
}

class DeliverableSection {
    SectionID;
    SectionTypeID;
    SequenceNumber;
    SectionGuid;
    SectionName;
    SectionTitle;
    Notes = [];
    Deleted;
}


class MilestoneSection {
    SectionID;
    SectionTypeID;
    SequenceNumber;
    SectionGuid;
    SectionName;
    SectionTitle;
    Notes = [];
    Deleted;
}



class KeyPerIndicatorSection {
    SectionID;
    SectionTypeID;
    SequenceNumber;
    SectionGuid;
    SectionName;
    SectionTitle;
    Notes = [];
    Deleted;
}


class KpiSection {
    SectionID;
    SectionTypeID;
    SequenceNumber;
    SectionGuid;
    SectionName;
    SectionTitle;
    Notes = [];
    Deleted;
}



class AdHocSection {
    SectionID;
    SectionTypeID;
    SequenceNumber;
    SectionGuid;
    SectionName;
    SectionTitle;
    Notes = [];
    TrRows = [];
    Deleted;
}


class TrRow {
    CellID;
    CellGuid;
    RowSequenceNumber;
    RowNumber;
    ColumnNumber;
    LengthUnit;
    Alignment;
    DataType;
    DataFormat;
    ValueText;
    ReadOnly;
    FormulaText;
    SumRequired;
    Deleted;
}

class Note {
    NoteID;
    NoteText;
    NoteGuid;
    SequenceNumber;
}



// Document Ready Begin
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

    $('.input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });

    $("#OneTimeDateColumn").hide();

    $("#ReportingFrequencyDDL").change(function (e) {
        e.preventDefault();
        var _reportingFrequencyDDL_Value = $("#ReportingFrequencyDDL").val();
        if (_reportingFrequencyDDL_Value == _gReportFrequency_OneTime) {
            $("#OneTimeDateColumn").show();
        }
        else {
            $("#OneTimeDateColumn").hide();
        }
    });

    $("#btnAddSheet").click(function (e) {
        e.preventDefault();
        btnAddSheet_Click(e)
    });


    $("#btnSaveAll_Top, #btnSaveAll_Bottom").click(function (e) {
        e.preventDefault();
        btnSaveAll_Click(e)
    });


    if (_gCurrentFundingDetailId > 0 && _gCurrentReportTemplateId > 0) {
        EditMode_GetTemplate_Begin(_gCurrentFundingDetailId, _gCurrentReportTemplateId);
    }


    $("#ModalSaveTemplate_BtnOk").click(function (e) {

        e.preventDefault();

        $('#ModalSaveTemplate').modal('hide');

        window.location.reload(true);

    });


    $("#btnPreviousTemplates").click(function (e) {

        e.preventDefault();

        ModalPreviousTemplates_Show();
    });


    // PreviousTemplates Modal
    $("#PT_SearchResult_Row").hide();

    $("#ModalPreviousTemplates_SearchBtn").click(function (e) {
        e.preventDefault();
        ModalPreviousTemplates_SearchBtn_Click(e);
    });


    $("#PT_SelectBtn").click(function (e) {

        e.preventDefault();

        ModalPreviousTemplates_SelectBtn_Click(e);
    });


});
// Document Ready End


// UUID() Begin 
function UUID() {
    // uuidv4
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
// UUID() End 


function ModalPreviousTemplates_Show() {

    $("#ModalPreviousTemplates").modal('show');

    $("#ModalPreviousTemplates_Message").text("");

    $("#PT_SearchResult_Row").hide();

    $("#PT_SearchResult_Table_Body").empty();

}


function ModalPreviousTemplates_SearchBtn_Click(event) {


    console.log("ModalPreviousTemplates_SearchBtn_Click() was click.");

    var _fiscalYear_Val = $("#PT_FiscalYearList").val();
    var _reportTitle_Val = $("#PT_ReportTitle").val();
    var _fundingDetailId_Val = $("#PT_FundingDetailId").val();
    var _fundingDetailName_Val = $("#PT_FundingDetailName").val();

    if ((_fiscalYear_Val == null || _fiscalYear_Val == "") &&
        (_reportTitle_Val == null || _reportTitle_Val == "") &&
        (_fundingDetailId_Val == null || _fundingDetailId_Val == "") &&
        (_fundingDetailName_Val == null || _fundingDetailName_Val == "")) {

        $("#ModalPreviousTemplates_Message").text("Please select fiscal year, or enter report title, id, name.");

        $("#PT_SearchResult_Row").hide();

        return;

    } else {

        $("#ModalPreviousTemplates_Message").text("");

        ModalPreviousTemplates_Search_Ajax(_fiscalYear_Val, _reportTitle_Val, _fundingDetailId_Val, _fundingDetailName_Val);
    }


}


function ModalPreviousTemplates_Search_Ajax( fiscalYear, reportTitle, fundingDetailId, fundignDetailName ) {


    var ReportTemplate_PreviousTemplate_VM = {
        FiscalYear: fiscalYear,
        ReportTitle: reportTitle,
        FundingDetailId: fundingDetailId,
        FundingDetailName: fundignDetailName
    }

    console.log("ModalPreviousTemplates_Search_Ajax() was called, below was object to submit for search.");

    console.log(ReportTemplate_PreviousTemplate_VM);

    $.ajax({
        url: '/api/ReportTemplateApi/SearchPreviousTemplates/',
        type: 'POST',
        data: JSON.stringify(ReportTemplate_PreviousTemplate_VM),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, xhr) {

            console.log("search /api/ReportTemplateApi/SearchPreviousTemplates/ return result below.");
            console.log(data);

            $("#PT_SearchResult_Row").hide();

            if (data.isExecuteSuccess == "1") {

                if (data.returnResult == null || data.returnResult.length == 0) {
                    $("#ModalPreviousTemplates_Message").text("Search previous templates not found.");

                } else {
                    ModalPreviousTemplate_SearchTemplates_DisplayResult(data.returnResult);
                }
       
                // ModalPreviousTemplate_SearchTemplates_DisplayResult(_gFakeTemplates);

            } else {

                $("#ModalPreviousTemplates_Message").text("Search previous templates failed,  try again later ...");
                console.log(data.errorMessage);
                console.log(data.errorDetailMessage);
            }

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
           
            console.warn("/api/ReportTemplateApi/ReportTemplateApi/" + err.message);
            // console.warn("/api/ReportTemplateApi/SaveTemplate/" + err.message);
     
        }

    });

}


function ModalPreviousTemplate_SearchTemplates_DisplayResult(templateObjList)
{

    // PT_SearchResult_Table_Body

    $("#PT_SearchResult_Table_Body").empty();

    for (var i = 0; i < templateObjList.length; i++)
    {
        var templateObj = templateObjList[i];

        var trStr = "<tr>" +
            "<td> <input type='radio' name='multiTemplates' value='" + templateObj.fundingDetailID + '=' + templateObj.fltReportTemplateID + "'" + "/> </td>" +
            "<td>" + templateObj.adminLetterID + "</td>" +
            "<td>" + templateObj.name + "</td>" +
            "<td>" + templateObj.reportTitle + "</td>" +
            "<td>" + templateObj.fiscalYear + "</td>" +
            "</tr>";

        $("#PT_SearchResult_Table_Body").append(trStr);
    }

    
   // $("input[name=multiTemplates]:first").attr('checked', true);

    $("#PT_SearchResult_Row").show();

   
}


function ModalPreviousTemplates_SelectBtn_Click(event) {

    var multiId = $("input[name='multiTemplates']:checked").val();

    if (multiId == undefined || multiId == null || multiId == "" ) {

        $("#ModalPreviousTemplates_Message").text("Please click the one of radios, then click the select button.");

        return;
    }

    $("#ModalPreviousTemplates_Message").text("");


    var multiIdArr = multiId.split("=");


    console.log("current funding Detail Id = " + _gCurrentFundingDetailId + " current report template Id =" + _gCurrentReportTemplateId);

    console.log(" Previous template Funding Detail Id = " + multiIdArr[0] + "  Previous report template Id = " + multiIdArr[1] );


    $("#" + _gPanelContainerDivId).empty();



    // re-call it again
    // EditMode_GetTemplate_Begin(_gCurrentFundingDetailId, _gCurrentReportTemplateId);

    $("#ModalPreviousTemplates").modal('hide');

    EditMode_GetTemplate_Begin(multiIdArr[0], multiIdArr[1]);

}




function btnSaveAll_Click(event) {


    var _isAllRequiredFieldValid = true;


    var _reportTitle_Val = $("#ReportTitle").val();
    if (_reportTitle_Val == null || _reportTitle_Val == "") {
        _isAllRequiredFieldValid = false;
        showModalAlert("Save Validation ", "Report title is required .");
        return;
    }

    var _reportingFrequency_Val = $("#ReportingFrequencyDDL").val();
    if (_reportingFrequency_Val == null || _reportingFrequency_Val == "") {
        _isAllRequiredFieldValid = false;
        showModalAlert("Save Validation ", "Report frequency is required .");
        return;
    }

    var _oneTimeDateTxt_Val = $("#OneTimeDateTxt").val();
    if ((_oneTimeDateTxt_Val == null || _oneTimeDateTxt_Val == "") && _reportingFrequency_Val == _gReportFrequency_OneTime) {
        _isAllRequiredFieldValid = false;
        showModalAlert("Save Validation ", "One Time Date is required .");
        return;
    }

   


    ReportTemplate_VM.FundingDetailID = _gCurrentFundingDetailId;
    ReportTemplate_VM.CurrentUserId = _gCurrentUserId;
    ReportTemplate_VM.FiscalYear = _gFiscalYear;
    ReportTemplate_VM.ReportTemplateID = _gCurrentReportTemplateId;

    ReportTemplate_VM.ReportTitle = _reportTitle_Val;
    ReportTemplate_VM.ReportFrequency = _reportingFrequency_Val;
    ReportTemplate_VM.ReportDueDateStr = _oneTimeDateTxt_Val;


    var _sheets = [];

    // foreach each Sheet Panel Begin
    $("." + _gSheetPanelClass).each(function (sheetIndex, sheetElement) {

        let _newSheet = new Sheet();
        let forbiddenChars = /[\/\\\?\*\[\]\:]/;
        var _sheetPanelId = $(this).attr("id");
        var _sheetPanelIdPartArray = _sheetPanelId.split("_");
        var _sheetGuid = _sheetPanelIdPartArray[1];

        var _sheetNameId = _gPanelSheetNameIdPrefix + _sheetGuid;
        var _sheetNameId_Val = $("#" + _sheetNameId).val();
        if (_sheetNameId_Val == null || _sheetNameId_Val == "") {

            _isAllRequiredFieldValid = false;
            showModalAlert("Sheet Input Validation ", "Sheet Name is required .");
            return ;
        }

        if (_sheetNameId_Val != null && forbiddenChars.test(_sheetNameId_Val)) {

            _isAllRequiredFieldValid = false;
            showModalAlert("Sheet Input Validation ", "Sheet Name contains forbidden characters . ( /, ?, [, ], : )");
            return ;
        }

        var _sheetTitleId = _gPanelSheetTitleIdPrefix + _sheetGuid;
        var _sheetTitleId_Val = $("#" + _sheetTitleId).val();

        if (_sheetTitleId_Val == null || _sheetTitleId_Val == "") {
            _isAllRequiredFieldValid = false;
            showModalAlert("Sheet Input Validation ", "Sheet Title is required .");
            return ;
        } 

        if (_sheetTitleId_Val != null && forbiddenChars.test(_sheetTitleId_Val)) {
            _isAllRequiredFieldValid = false;
            showModalAlert("Sheet Input Validation ", "Sheet Title contains forbidden characters . ( /, ?, [, ], : )");
            return ;
        }


        var _sheetId = $(this).data("sheetid");
        var _sheetSequenceNumber = $(this).data("panelsequencenumber");
        console.log("SheetId:" + _sheetId + "  SheetGuid:" + _sheetGuid + " SheetName:" + _sheetNameId_Val + " SheetTitle:" + _sheetTitleId_Val + " SheetSequenceNumber:" + _sheetSequenceNumber);
        _newSheet.SheetID = _sheetId;
        _newSheet.SheetGuid = _sheetGuid;
        _newSheet.SheetName = _sheetNameId_Val;
        _newSheet.SheetTitle = _sheetTitleId_Val;
        _newSheet.SheetSequenceNumber = _sheetSequenceNumber;

        var _sheetHeaders = [];

        var _gSheetPanelHeaderClass = _gPanelHeader_InputTxtClassPrefix + _sheetGuid;

        var _sheetHeaderRowCount = 0;
        $("." + _gSheetPanelHeaderClass).each(function (sheetHeaderIndex, sheetHeaderElement) {

            var _newSheetHeader = new SheetHeader();

            var _header_Text = $(this).val();

            var _header_SequenceNumber = $(this).data("panel-headersequencenumber");

            if (_header_Text != null && _header_Text != "") {

                _sheetHeaderRowCount = parseInt(_sheetHeaderRowCount) + parseInt(1);
            }

            _newSheetHeader.SheetHeader_Text = _header_Text;

            _newSheetHeader.SheetHeader_SequenceNumber = _header_SequenceNumber;



            _sheetHeaders.push(_newSheetHeader);
        });

        if (_sheetHeaderRowCount == 0) {
            // _isAllRequiredFieldValid = false;
            //   showModalAlert("Sheet Header Validation ", "One Header is required .");
            //   return false;
        }
        _newSheet.SheetHeaders = _sheetHeaders;


        var _sheetFooters = [];
        var _gSheetPanelFooterClass = _gPanelFooter_InputTxtClassPrefix + _sheetGuid;

        $("." + _gSheetPanelFooterClass).each(function (sheetHeaderIndex, sheetHeaderElement) {

            var _newSheetFooter = new SheetFooter();

            var _Footer_Text = $(this).val();

            var _Footer_SequenceNumber = $(this).data("panel-footersequencenumber");

            _newSheetFooter.SheetFooter_Text = _Footer_Text;

            _newSheetFooter.SheetFooter_SequenceNumber = _Footer_SequenceNumber;


            _sheetFooters.push(_newSheetFooter);
        });

        _newSheet.SheetFooters = _sheetFooters;


        // vip section sequence number
        var _sectionSequenceNumber = 0;

        // Deliverable Section , only one Begin
        let deliverableSection = new DeliverableSection();
        var deliverableSections = $(this).find("." + _gDeliverableSectionPanelClass);

        $(deliverableSections).each(function (deliverableSectionIndex, deliverableSectionElement) {

            var deliverableDivId = $(this).attr("id");

            var _sectionTypeId = $(this).data("sectiontypeid");

            // Get sectionGuid
            var _sectonGuidPartArray = deliverableDivId.split("_");
            var _sectionGuid = _sectonGuidPartArray[1];

            var _sectionName_FieldId = _gDeliverableSectioPanel_SectionNameIdPrefix + _sectionGuid;
            var _sectionName_Val = $("#" + _sectionName_FieldId).val();

            var _sectionTitle_FieldId = _gDeliverableSectioPanel_SectionTitleIdPrefix + _sectionGuid;
            var _sectionTitle_Val = $("#" + _sectionTitle_FieldId).val();


            var _noteInputs = $(this).find("." + _gDeliverableSectionPanel_SectionNoteInputTxtClass);
            var _notes = [];
            $(_noteInputs).each(function (noteIndex, noteElement) {
                var _note_text = $(noteElement).val();
                var _note_seqNo = $(noteElement).data("notesequencenumber");
                var _noteId = $(this).attr("id");
                var _noteIdPartArray = _noteId.split("_");
                var _noteGuid = _noteIdPartArray[1];

                let _newNote = new Note();
                _newNote.NoteText = _note_text;
                _newNote.SequenceNumber = _note_seqNo;
                _newNote.NoteGuid = _noteGuid;

                _notes.push(_newNote);
            });

            _sectionSequenceNumber = parseInt(_sectionSequenceNumber) + parseInt("1");

            deliverableSection.SectionTypeID = _sectionTypeId;
            deliverableSection.SectionGuid = _sectionGuid;
            deliverableSection.SectionName = _sectionName_Val;
            deliverableSection.SectionTitle = _sectionTitle_Val;
            deliverableSection.Notes = _notes;
            deliverableSection.SequenceNumber = _sectionSequenceNumber;

        });

        _newSheet.deliverableSection = deliverableSection;
        // Deliverable Section , only one End


        // Milestone Section , only one Begin
        let milestoneSection = new MilestoneSection();
        var milestoneSections = $(this).find("." + _gMilestoneSectionPanelClass);

        $(milestoneSections).each(function (milestoneSectionIndex, milestoneSectionElement) {

            var milestoneDivId = $(this).attr("id");
            var _sectionTypeId = $(this).data("sectiontypeid");

            // Get sectionGuid
            var _sectonGuidPartArray = milestoneDivId.split("_");
            var _sectionGuid = _sectonGuidPartArray[1];

            var _sectionName_FieldId = _gMilestoneSectionPanel_SectionNameIdPrefix + _sectionGuid;
            var _sectionName_Val = $("#" + _sectionName_FieldId).val();

            var _sectionTitle_FieldId = _gMilestoneSectionPanel_SectionTitleIdPrefix + _sectionGuid;
            var _sectionTitle_Val = $("#" + _sectionTitle_FieldId).val();


            var _noteInputs = $(this).find("." + _gMilestoneSectionPanel_SectionNoteInputTxtClass);
            var _notes = [];
            $(_noteInputs).each(function (noteIndex, noteElement) {
                var _note_text = $(noteElement).val();
                var _note_seqNo = $(noteElement).data("notesequencenumber");
                var _noteId = $(this).attr("id");
                var _noteIdPartArray = _noteId.split("_");
                var _noteGuid = _noteIdPartArray[1];

                let _newNote = new Note();
                _newNote.NoteText = _note_text;
                _newNote.SequenceNumber = _note_seqNo;
                _newNote.NoteGuid = _noteGuid;

                _notes.push(_newNote);

            });

            _sectionSequenceNumber = parseInt(_sectionSequenceNumber) + parseInt("1");

            milestoneSection.SectionTypeID = _sectionTypeId;
            milestoneSection.SectionGuid = _sectionGuid;
            milestoneSection.SectionName = _sectionName_Val;
            milestoneSection.SectionTitle = _sectionTitle_Val;
            milestoneSection.Notes = _notes;
            milestoneSection.SequenceNumber = _sectionSequenceNumber;


        });
        _newSheet.milestoneSection = milestoneSection;
        // Milestone Section , only one End

        // KeyPerIndicator Section , only one Begin
        let keyPerIndicatorSection = new KeyPerIndicatorSection();
        var keyPerIndicatorSections = $(this).find("." + _gKeyPerIndicatorSectionPanelClass);

        $(keyPerIndicatorSections).each(function (keyPerIndicatorSectionIndex, keyPerIndicatorSectionElement) {

            var keyPerIndicatorDivId = $(this).attr("id");

            var _sectionTypeId = $(this).data("sectiontypeid");

            // Get sectionGuid
            var _sectonGuidPartArray = keyPerIndicatorDivId.split("_");
            var _sectionGuid = _sectonGuidPartArray[1];


            var _sectionName_FieldId = _gKeyPerIndicatorSectionPanel_SectionNameIdPrefix + _sectionGuid;
            var _sectionName_Val = $("#" + _sectionName_FieldId).val();

            var _sectionTitle_FieldId = _gKeyPerIndicatorSectionPanel_SectionTitleIdPrefix + _sectionGuid;
            var _sectionTitle_Val = $("#" + _sectionTitle_FieldId).val();


            var _noteInputs = $(this).find("." + _gKeyPerIndicatorSectionPanel_SectionNoteInputTxtClass);
            var _notes = [];
            $(_noteInputs).each(function (noteIndex, noteElement) {
                var _note_text = $(noteElement).val();
                var _note_seqNo = $(noteElement).data("notesequencenumber");
                var _noteId = $(this).attr("id");
                var _noteIdPartArray = _noteId.split("_");
                var _noteGuid = _noteIdPartArray[1];

                let _newNote = new Note();
                _newNote.NoteText = _note_text;
                _newNote.SequenceNumber = _note_seqNo;
                _newNote.NoteGuid = _noteGuid;

                _notes.push(_newNote);

            });

            _sectionSequenceNumber = parseInt(_sectionSequenceNumber) + parseInt("1");

            keyPerIndicatorSection.SectionTypeID = _sectionTypeId;
            keyPerIndicatorSection.SectionGuid = _sectionGuid;
            keyPerIndicatorSection.SectionName = _sectionName_Val;
            keyPerIndicatorSection.SectionTitle = _sectionTitle_Val;
            keyPerIndicatorSection.Notes = _notes;

            keyPerIndicatorSection.SequenceNumber = _sectionSequenceNumber;

        });

        _newSheet.keyPerIndicatorSection = keyPerIndicatorSection;
        // KeyPerIndicator Section , only one End



        // KPI Section , only one Begin
        let kpiSection = new KpiSection();
        var kpiSections = $(this).find("." + _gKpiSectionPanelClass);

        $(kpiSections).each(function (kpiSectionIndex, kpiSectionElement) {

            var kpiDivId = $(this).attr("id");
            var _sectionTypeId = $(this).data("sectiontypeid");

            // Get sectionGuid
            var _sectonGuidPartArray = kpiDivId.split("_");
            var _sectionGuid = _sectonGuidPartArray[1];

            var _sectionName_FieldId = _gKpiSectionPanel_SectionNameIdPrefix + _sectionGuid;
            var _sectionName_Val = $("#" + _sectionName_FieldId).val();

            var _sectionTitle_FieldId = _gKpiSectionPanel_SectionTitleIdPrefix + _sectionGuid;
            var _sectionTitle_Val = $("#" + _sectionTitle_FieldId).val();


            var _noteInputs = $(this).find("." + _gKpiSectionPanel_SectionNoteInputTxtClass);
            var _notes = [];
            $(_noteInputs).each(function (noteIndex, noteElement) {
                var _note_text = $(noteElement).val();
                var _note_seqNo = $(noteElement).data("notesequencenumber");
                var _noteId = $(this).attr("id");
                var _noteIdPartArray = _noteId.split("_");
                var _noteGuid = _noteIdPartArray[1];

                let _newNote = new Note();
                _newNote.NoteText = _note_text;
                _newNote.SequenceNumber = _note_seqNo;
                _newNote.NoteGuid = _noteGuid;

                _notes.push(_newNote);

            });

            _sectionSequenceNumber = parseInt(_sectionSequenceNumber) + parseInt("1");

            kpiSection.SectionTypeID = _sectionTypeId;
            kpiSection.SectionGuid = _sectionGuid;
            kpiSection.SectionName = _sectionName_Val;
            kpiSection.SectionTitle = _sectionTitle_Val;
            kpiSection.Notes = _notes;

            kpiSection.SequenceNumber = _sectionSequenceNumber;
        });

        _newSheet.kpiSection = kpiSection;
        // KPI Section , only one End


        // AdHoc Section , only one Begin Multiple
        var _adHocSections = [];

        var adSections = $(this).find("." + _gAdSectionPanelClass);

        $(adSections).each(function (adIndex, adSectionElement) {

            let adHocSection = new AdHocSection();

            var adDivId = $(this).attr("id");

            var _sectionTypeId = $(this).data("sectiontypeid");

            // Get sectionGuid
            var _sectonGuidPartArray = adDivId.split("_");
            var _sectionGuid = _sectonGuidPartArray[1];

            var _sectionName_FieldId = _gAdSectionPanel_SectionNameIdPrefix + _sectionGuid;
            var _sectionName_Val = $("#" + _sectionName_FieldId).val();

            var _sectionTitle_FieldId = _gAdSectionPanel_SectionTitleIdPrefix + _sectionGuid;
            var _sectionTitle_Val = $("#" + _sectionTitle_FieldId).val();


            _sectionSequenceNumber = parseInt(_sectionSequenceNumber) + parseInt("1");

            adHocSection.SectionTypeID = _sectionTypeId;
            adHocSection.SectionGuid = _sectionGuid;
            adHocSection.SectionName = _sectionName_Val;
            adHocSection.SectionTitle = _sectionTitle_Val;

            adHocSection.SequenceNumber = _sectionSequenceNumber;


            // re-sorting the tr row sequence number => it doesn't work , it is bug
            // console.log("trRows re-sorting the sequence number sheetGuid =" + _sheetGuid + " sectionGuid =" + _sectionGuid);
            // sheet_Panel_AdSectionPanel_SortTablRows_SequenceNumber(_sheetGuid, _sectionGuid);
            // sequence number here , using tr rows counter = 0;

            var _tableBodyId = _gAdSectionPanel_TableIdPrefix + _sectionGuid + "_Body";
            var _filterBodyTr = "#" + _tableBodyId + " > tr";

            var _trRows = [];
            var _trRowCounter = 0;
            $(_filterBodyTr).each(function (trIndex, trElement) {

                let _newTrRow = new TrRow();

                var _trRowId = $(this).attr("id");
                var _trRowIdPartArray = _trRowId.split('_');
                var _trRowGuid = _trRowIdPartArray[1];

                // var _rowSequenceNumber = $(this).data("sequencenumber");
                // var _rowSequenceNumber = $("#" + _trRowId).data("sequencenumber");
                //  console.log("rowGuidRowId:" + _trRowId + "  sequenceNumber:" + _rowSequenceNumber);

                _trRowCounter = parseInt(_trRowCounter) + parseInt(1);

                _newTrRow.CellGuid = _trRowGuid;
                // _newTrRow.RowSequenceNumber = _rowSequenceNumber;
                _newTrRow.RowSequenceNumber = _trRowCounter;

                var _inputSelect_RowId = "InputSelectRowId_" + _trRowGuid;
                var _inputSelect_RowId_Val = $("#" + _inputSelect_RowId).val();
                _newTrRow.RowNumber = _inputSelect_RowId_Val;

                var _inputSelect_ColId = "InputSelectColId_" + _trRowGuid;
                var _inputSelect_ColId_Val = $("#" + _inputSelect_ColId).val();
                _newTrRow.ColumnNumber = _inputSelect_ColId_Val;

                var _inputSelect_LengthUnitId = "InputSelectLengthUnitId_" + _trRowGuid;
                var _inputSelect_LengthUnitId_Val = $("#" + _inputSelect_LengthUnitId).val();
                _newTrRow.LengthUnit = _inputSelect_LengthUnitId_Val;

                var _inputSelect_AlignmentId = "InputSelectAlignmentId_" + _trRowGuid;
                var _inputSelect_AlignmentId_Val = $("#" + _inputSelect_AlignmentId).val();
                _newTrRow.Alignment = _inputSelect_AlignmentId_Val;

                var _inputSelect_DataTypeId = "InputSelectDataTypeId_" + _trRowGuid;
                var _inputSelect_DataTypeId_Val = $("#" + _inputSelect_DataTypeId).val();
                _newTrRow.DataType = _inputSelect_DataTypeId_Val;

                var _inputSelect_DataFormatId = "InputSelectDataFormatId_" + _trRowGuid;
                var _inputSelect_DataFormatId_Val = $("#" + _inputSelect_DataFormatId).val();
                _newTrRow.DataFormat = _inputSelect_DataFormatId_Val;


                var _inputTextArea_ValueId = "InputTextAreaValueId_" + _trRowGuid;
                var _inputTextArea_ValueId_Val = $("#" + _inputTextArea_ValueId).val();
                _newTrRow.ValueText = _inputTextArea_ValueId_Val;

                var _inputSelect_ReadOnlyId = "InputSelectReadOnlyId_" + _trRowGuid;
                var _inputSelect_ReadOnlyId_Val = $("#" + _inputSelect_ReadOnlyId).val();
                _newTrRow.ReadOnly = _inputSelect_ReadOnlyId_Val;


                var _inputText_FormulaId = "InputTextFormulaId_" + _trRowGuid;
                var _inputText_FormulaId_Val = $("#" + _inputText_FormulaId).val();
                _newTrRow.FormulaText = _inputText_FormulaId_Val;


                var _inputSelect_SumRequiredId = "InputSelectSumRequiredId_" + _trRowGuid;
                var _inputSelect_SumRequiredId_Val = $("#" + _inputSelect_SumRequiredId).val();
                _newTrRow.SumRequired = _inputSelect_SumRequiredId_Val;


                _trRows.push(_newTrRow);
            });

            adHocSection.TrRows = _trRows;

            _adHocSections.push(adHocSection);
        });
        // AdHoc Section , only one End

        _newSheet.adHocSections = _adHocSections;

        _sheets.push(_newSheet);

    });
    // foreach each Sheet Panel End

    ReportTemplate_VM.Sheets = _sheets;

    if (_isAllRequiredFieldValid == false) {
        //showModalAlert("Save Validation ", "Please fill in required fields .");
        return;
    }
    console.log("Post API Object Show Bleow :");
    console.log(ReportTemplate_VM);

    var objStr = JSON.stringify(ReportTemplate_VM, null, 4);
    console.log("Post API Formatted Object Show Bleow : ");
    console.log(objStr);


    $.ajax({
        url: '/api/ReportTemplateApi/SaveTemplate/',
        type: 'POST',
        data: JSON.stringify(ReportTemplate_VM),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, xhr) {

            if (data.isExecuteSuccess == "1") {
                console.log("return template ID:" + data.templateID);
                _gCurrentReportTemplateId = data.templateID;
                $("#reportTemplateId").val();

                showModalSaveTemplate("Save Template Successfully", "Please click Ok button, page will be refresh in seconds.");
            } else {
                showModalAlert("Save Template Failed", "Please close modal window , try again later ...");
                console.log(data.errorMessage);
                console.log(data.errorDetailMessage);
            }

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$("#HospitalRevenueLineModal_TargetMessage").html(err.message);
            //$("#HospitalRevenueLineModal_TargetMessage").addClass("text-danger");
            console.warn("/api/ReportTemplateApi/SaveTemplate/" + err.message);
            // console.warn("/api/ReportTemplateApi/SaveTemplate/" + err.message);
            showModalAlert("Save Template Failed", "Please close modal window , try again later ...");
        }

    });



}



// btnAddSheet_Click() Begin
function btnAddSheet_Click(event) {
    var _guid = UUID();
    var _sheetId = 0;
    var _panelTemplate = sheet_GetPanelTemplate(_guid, _sheetId);

    $("#" + _gPanelContainerDivId).append(_panelTemplate);

    // registerPanelDeleteBtnEvent();
    sheet_Panel_RegiterDeleteBtnEvent()

    panelTemplates_SortSequenceNumber();

    // addPanelHeaderBtnClickEvent();
    sheet_Panel_RegiterAddHeaderBtnEvent();

    // addPanelSectionBtnClickEvent();
    sheet_Panel_RegisterAddSectionBtnEvent();

    sheet_Panel_RegiterAddFooterBtnEvent();

}
// btnAddSheet_Click() End


//  getPanelTemplate(guid) Begin
function sheet_GetPanelTemplate(sheetGuid, sheetId) {

    var _panelId = _gPanelIdPrefix + sheetGuid;
    var _panelSequeneceClass = _gPanelSequenceClass;
    var _panelDeleteBtnId = _gPanelDeleteBtnIdPrefix + sheetGuid;
    var _panelSheetNameId = _gPanelSheetNameIdPrefix + sheetGuid;
    var _panelSheetNameMessageSpanId = _gPanelSheetNameMessageSpanIdPrefix + sheetGuid;
    var _panelSheetTitleId = _gPanelSheetTitleIdPrefix + sheetGuid;
    var _panelSheetTitleMessageSpanId = _gPanelSheetTitleMessageSpanIdPrefix + sheetGuid;
    var _panelHeaderContainerDivId = _gPanelHeaderContainerDivIdPrefix + sheetGuid;
    var _panelFooterContainerDivId = _gPanelFooterContainerDivIdPrefix + sheetGuid;
    var _panelAddHeaderBtnId = _gPanelAddHeaderBtnIdPrefix + sheetGuid;
    var _panelAddFooterBtnId = _gPanelAddFooterBtnIdPrefix + sheetGuid;
    var _panelSectionDropDownListId = _gPanelSectionDropDownListIdPrefix + sheetGuid;
    var _panelAddSectionBtnId = _gPanelAddSectionBtnIdPrefix + sheetGuid;
    var _panelDeliverableSectionContainerDivId = _gPanelDeliverableSectionContainerDivIdPrefix + sheetGuid;
    var _panelMilestoneSectionContainerDivId = _gPanelMilestoneSectionContainerDivIdPrefix + sheetGuid;
    var _panelKeyPerIndicatorSectionContainerDivId = _gPanelKeyPerIndicatorSectionContainerDivIdPrefix + sheetGuid;
    var _panelKpiSectionContainerDivId = _gPanelKpiSectionContainerDivIdPrefix + sheetGuid;
    var _panelAdSectionContainerDivId = _gPanelAdSectionContainerDivIdPrefix + sheetGuid;

    var panelTemplate = `<div class="panel ${_gSheetPanelClass} panel-default ${_panelSequeneceClass}" id="${_panelId}" data-sheetid="${sheetId}">
                    <div class="panel-heading">
                       <div class="row">
                            <div class="col-lg-12">
                                      <div class="col-lg-6">
                                          <div class="form-group">
                                              <label  class="control-label">Sheet Name </label>
                                              <span style="color:red; font-size:100%; font-weight: bolder"><sup>*</sup></span>
                                              <input type="text" id="${_panelSheetNameId}" name="${_panelSheetNameId}" value="" class="form-control touchspin3 " maxlength="${_gReportTemplate_InputTextBox_MaxLength}" placeholder="Please enter sheet name" />
                                               <span id="${_panelSheetNameMessageSpanId}"> </span>
                                          </div>
                                     
                                      </div>

                                       <div class="col-lg-5">
                                            <div class= "form-group">
                                                <label  class="control-label">Sheet Title </label>
                                                 <span style="color:red; font-size:100%; font-weight: bolder"><sup>*</sup></span>
                                                <input type="text" id="${_panelSheetTitleId}" name="${_panelSheetTitleId}" value="" class="form-control touchspin3 " maxlength="${_gReportTemplate_InputTextBox_MaxLength}" placeholder="Please enter sheet title" />
                                                 <span id="${_panelSheetTitleMessageSpanId}"> </span>
                                            </div>
                                       </div>
                                   
                                        <div class="col-lg-1">
                                            <br />
                                            <button type="button" class="btn btn-danger ${_gPanelDeleteBtnClass}" id="${_panelDeleteBtnId}" > <i class="fa fa-trash"> </i> Delete </button>
                                        </div>
                                        
                                        
                            </div>
                       </div>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                                <div class="col-lg-10"> &nbsp; </div>
                                <div class="col-lg-2">
                                   <button class="btn btn-success btn-sm btn-rounded ${_gPanelAddHeaderBtnClass}" type="button" id="${_panelAddHeaderBtnId}"> <i class="fa fa-plus fa-sm"></i> Header </button>
                                </div>
                        </div>
                        <div id="${_panelHeaderContainerDivId}">

                        </div>

                        <div class="row">
                            <div class="col-lg-1"> <lable> <b> Section </b> </label> </div>
                            <div class="col-lg-9">
                                <select id="${_panelSectionDropDownListId}" name="${_panelSectionDropDownListId}" class="form-control">
                                    <option value="">Choose section, then click Add Setion button </option>
                                    <option value="${_gSectionType_Deliverable}">Deliverable</option>
                                    <option value="${_gSectionType_Milestone}">Milestone</option>
                                    <option value="${_gSectionType_KeyPerformanceIndicator}">Key Performance Indicator</option>
                                    <option value="${_gSectionType_KPI}">KPI (Functional center measurement / Program Subcatory)</option>
                                    <option value="${_gSectionType_AdHoc}">Additional KPI</option>
                                </select>
                            </div>
                            <div class="col-lg-2">
                                <button class="btn btn-info btn-sm btn-rounded ${_gPanelAddSectionBtnClass}" type="button" id="${_panelAddSectionBtnId}"> <i class="fa fa-plus fa-sm"></i> Add Section </button>
                            </div>
                        </div>

                      <div id="${_panelDeliverableSectionContainerDivId}" style="padding:8px" >
                      </div>

                      <div id="${_panelMilestoneSectionContainerDivId}" style="padding:8px" >
                      </div>


                      <div id="${_panelKeyPerIndicatorSectionContainerDivId}" style="padding:8px" >
                      </div>

                      <div id="${_panelKpiSectionContainerDivId}" style="padding:8px">
                      </div>
                        
                      <div id="${_panelAdSectionContainerDivId}" style="padding:8px">
                      </div>

                      <div class="row">
                                <div class="col-lg-10"> &nbsp; </div>
                                <div class="col-lg-2">
                                   <button class="btn btn-success btn-sm btn-rounded ${_gPanelAddFooterBtnClass}" type="button" id="${_panelAddFooterBtnId}"> <i class="fa fa-plus fa-sm"></i> Footer </button>
                                </div>
                      </div>

                     <div id="${_panelFooterContainerDivId}">

                     </div>


                    </div>
               </div>`;
    return panelTemplate;

}
//  getPanelTemplate(guid) End


// sheet_Panel_RegiterDeleteBtnEvent Begin
function sheet_Panel_RegiterDeleteBtnEvent() {
    $("." + _gPanelDeleteBtnClass).click(function (e) {
        e.preventDefault();

        var _deleteBtnId = $(this).attr("id");

        var _idPartArray = _deleteBtnId.split("_");
        var _panelId = _gPanelIdPrefix + _idPartArray[1];
        $("#" + _panelId).remove();
        panelTemplates_SortSequenceNumber();
    });
}
// sheet_Panel_RegiterDeleteBtnEvent End


// sheet_Panel_RegisterAddSectionBtnEvent() Begin
function sheet_Panel_RegisterAddSectionBtnEvent() {

    $("." + _gPanelAddSectionBtnClass).click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation(); // VIP Note
        var _panelAddSectionBtnId = $(this).attr("id");
        var _panelAddSectionBtnIdPartArray = _panelAddSectionBtnId.split("_");
        var _sheetGuid = _panelAddSectionBtnIdPartArray[1];
        var _panelSectionDropDownListId = _gPanelSectionDropDownListIdPrefix + _sheetGuid;

        var _sectionSelectedValue = $("#" + _panelSectionDropDownListId).val();


        if (_sectionSelectedValue == null || _sectionSelectedValue == "") {
            // alert("Please select ");
            showModalAlert("Alert", "Please select section, then click Add Section button.");
            return;
        }
        else {
            if (_sectionSelectedValue == _gSectionType_Deliverable) {
                // Deliverable,
                var _deliverableSectonPerSheetCount = isDeliverableSectionPanelExisted(_sheetGuid);

                if (_deliverableSectonPerSheetCount == 0) {
                    // var _deliverableTemplate = getDeliverableTemplate(_panelId);
                    var _sectionGuid = UUID();
                    var _deliverableTemplate = sheet_Panel_GetDeliverableTemplate(_sheetGuid, _gSectionType_Deliverable, _sectionGuid);

                    var _panelDeliverableSectionContainerId = _gPanelDeliverableSectionContainerDivIdPrefix + _sheetGuid;

                    $("#" + _panelDeliverableSectionContainerId).append(_deliverableTemplate);


                    sheet_Panel_DeliverableSectionPanel_RemoveBtnEvent(_sheetGuid);

                    sheet_Panel_DeliverableSectionPanel_AddNoteBtnEvent(_sheetGuid);


                } else {
                    showModalAlert("Alert", "only one deliverable section per sheet .");
                }

            }
            else if (_sectionSelectedValue == _gSectionType_Milestone) {
                // Milestone
                var _milestoneSectonPerSheetCount = isMilestoneSectionPanelExisted(_sheetGuid);

                if (_milestoneSectonPerSheetCount == 0) {
                    var _sectionGuid = UUID();

                    var _milestoneTemplate = sheet_Panel_GetMilestoneTemplate(_sheetGuid, _gSectionType_Milestone, _sectionGuid);

                    var _panelMilestoneSectionContainerId = _gPanelMilestoneSectionContainerDivIdPrefix + _sheetGuid;

                    $("#" + _panelMilestoneSectionContainerId).append(_milestoneTemplate);

                    sheet_Panel_MilestoneSectionPanel_RemoveBtnEvent(_sheetGuid);

                    sheet_Panel_MilestoneSectionPanel_AddNoteBtnEvent(_sheetGuid);
                }
                else {
                    showModalAlert("Alert", "only one milestone section per sheet .");
                }

            }
            else if (_sectionSelectedValue == _gSectionType_KeyPerformanceIndicator) {
                // Key Performance Indicator
                var _keyPerIndicatorSectonPerSheetCount = isKeyPerIndicatorSectionPanelExisted(_sheetGuid);

                if (_keyPerIndicatorSectonPerSheetCount == 0) {
                    var _sectionGuid = UUID();

                    var _keyPerIndicatorTempalte = sheet_Panel_GetKeyPerIndicatorTemplate(_sheetGuid, _gSectionType_KeyPerformanceIndicator, _sectionGuid);

                    var _panelKeyPerIndicatorSectionContainerId = _gPanelKeyPerIndicatorSectionContainerDivIdPrefix + _sheetGuid;

                    $("#" + _panelKeyPerIndicatorSectionContainerId).append(_keyPerIndicatorTempalte);

                    sheet_Panel_KeyPerIndicatorSectionPanel_RemoveBtnEvent(_sheetGuid);

                    sheet_Panel_KeyPerIndicatorSectionPanel_AddNoteBtnEvent(_sheetGuid);


                }
                else {
                    showModalAlert("Alert", "only one Key Performance Indicator section per sheet .");
                }



            }
            else if (_sectionSelectedValue == _gSectionType_KPI) {
                // KPI
                // alert("KPI"); only one Kpi section per sheet
                var _kpiSectonPerSheetCount = isKpiSectionPanelExisted(_sheetGuid);

                if (_kpiSectonPerSheetCount == 0) {

                    var _sectionGuid = UUID();

                    var _kpiTemplate = sheet_Panel_GetKpiTemplate(_sheetGuid, _gSectionType_KPI, _sectionGuid);

                    var _panelKpiSectionContainerId = _gPanelKpiSectionContainerDivIdPrefix + _sheetGuid;

                    $("#" + _panelKpiSectionContainerId).append(_kpiTemplate);

                    sheet_Panel_KpiSectionPanel_RemoveBtnEvent(_sheetGuid);

                    sheet_Panel_KpiSectionPanel_AddNoteBtnEvent(_sheetGuid);

                } else {
                    showModalAlert("Alert", "only one Kpi section per sheet .");
                }

            }
            else if (_sectionSelectedValue == _gSectionType_AdHoc) {
                // Additional KPI
                // Multiple

                var _sectionGuid = UUID();

                var _adTemplate = sheet_Panel_GetAdTemplate(_sheetGuid, _gSectionType_AdHoc, _sectionGuid);

                // var _panelAdSectionContainerId = "panelAdSectionContainerId_" + _panelId;
                var _panelAdSectionContainerId = _gPanelAdSectionContainerDivIdPrefix + _sheetGuid;

                $("#" + _panelAdSectionContainerId).append(_adTemplate);

                sheet_Panel_AdSectionPanel_RemoveBtnEvent(_sheetGuid);

                sheet_Panel_AdSectionPanel_AddTableRowBtnEvent(_sheetGuid, _sectionGuid);


            }
        }

    });

}
// sheet_Panel_RegisterAddSectionBtnEvent() End


//  panelTemplates_SortSequenceNumber() Begin
function panelTemplates_SortSequenceNumber() {
    var _panelSequenceClass = _gPanelSequenceClass;
    var _sequenceNumber = 0;

    $("." + _panelSequenceClass).each(function (index, element) {
        var _panelId = $(this).attr("id");

        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);
        $(this).attr("data-panelsequenceNumber", _sequenceNumber);
    });
}
//  panelTemplates_SortSequenceNumber() End


// sheet_Panel_RegiterAddHeaderBtnEvent() Begin
function sheet_Panel_RegiterAddHeaderBtnEvent() {

    $("." + _gPanelAddHeaderBtnClass).click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation(); // VIP NOTE
        var _panelAddHeaderBtnId = $(this).attr("id");
        var _panelAddHeaderBtnIdPartArray = _panelAddHeaderBtnId.split("_");
        var _panelId = _panelAddHeaderBtnIdPartArray[1];
        // appendPanelHeaderRow(_panelId);
        console.log("sheet_Panel_RegiterAddHeaderBtnEvent() panelId = " + _panelId);
        sheet_Panel_AppendHeaderRow(_panelId);
    });
}
// sheet_Panel_RegiterAddHeaderBtnEvent() End


function sheet_Panel_RegiterAddFooterBtnEvent() {


    $("." + _gPanelAddFooterBtnClass).click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var _panelAddFooterBtnId = $(this).attr("id");
        var _panelAddFooterBtnIdPartArray = _panelAddFooterBtnId.split("_");
        var _panelId = _panelAddFooterBtnIdPartArray[1];
        // appendPanelHeaderRow(_panelId);
        sheet_Panel_AppendFooterRow(_panelId)
    });
}


// sheet_Panel_AppendHeaderRow(panelId) Begin
function sheet_Panel_AppendHeaderRow(panelId) {
    var _panelHeaderLabelSpanClass = _gPanelHeader_LabelSpanClassPrefix + panelId;
    var _panelHeaderInputTxtClass = _gPanelHeader_InputTxtClassPrefix + panelId;
    var _panelHeaderSpanMessageClass = _gpanelHeader_InputTxt_SpanMessageClassPreifx + panelId;
    var _panelHeaderRemoveBtnClass = _gPanelHeader_RemoveBtnClassPrefix + panelId;

    var _headerRowGuid = UUID();
    var _panelHeaderRowId = _gPanelHeader_RowIdPrefix + _headerRowGuid;
    var _panelHeaderSequenceNumberId = _gPanelHeader_SequenceNumberIdPefix + _headerRowGuid;
    var _panelHeaderInputTxtId = _gPanelHeader_InputTxtIdPrefix + _headerRowGuid;
    var _panelHeaderRemoveBtnId = _gPanelHeader_RemoveBtnIdPrefix + _headerRowGuid;
    var _panelHeaderInputTxtSapnMessageId = _gPanelHeader_InputTxt_SpanMessageIdPrefix + _headerRowGuid;

    var panelHeaderRow = `<div class="row" id="${_panelHeaderRowId}">
                  
                     <div class="col-lg-1">
                      <label> <b> Header </b> </label> <b> <span class="${_panelHeaderLabelSpanClass}" id="${_panelHeaderSequenceNumberId}" > </span> </b>
                    </div>
                    <div  class="col-lg-9">
                          <div class="form-group">
                            <input type="text" id="${_panelHeaderInputTxtId}" name="${_panelHeaderInputTxtId}" value="" class="form-control touchspin3 ${_panelHeaderInputTxtClass}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" />
                            <span id="${_panelHeaderInputTxtSapnMessageId}" class="${_panelHeaderSpanMessageClass}"></span>
                            </div>
                    </div>
                   <div  class="col-lg-2">
                        <button type="button" id="${_panelHeaderRemoveBtnId}" class="btn btn-sm btn-warning btn-rounded ${_panelHeaderRemoveBtnClass}"> <i class="fa fa-sm fa-trash"> </i> Remove </button>
                   </div>
               </div>`;

    var panelHeaderContainerDivId = _gPanelHeaderContainerDivIdPrefix + panelId;
    $("#" + panelHeaderContainerDivId).append(panelHeaderRow);


    sheet_Panel_HeaderRow_AddRemoveBtnEvent(panelId);

    sheet_Panel_HeaderRows_SortHeaderTextSequenceNumber(panelId);

}
// sheet_Panel_AppendHeaderRow(panelId) End



// sheet_Panel_AppendFooterRow(panelId) Begin
function sheet_Panel_AppendFooterRow(panelId) {
    var _panelFooterLabelSpanClass = _gPanelFooter_LabelSpanClassPrefix + panelId;
    var _panelFooterInputTxtClass = _gPanelFooter_InputTxtClassPrefix + panelId;
    var _panelFooterSpanMessageClass = _gpanelFooter_InputTxt_SpanMessageClassPreifx + panelId;
    var _panelFooterRemoveBtnClass = _gPanelFooter_RemoveBtnClassPrefix + panelId;

    var _headerRowGuid = UUID();
    var _panelFooterRowId = _gPanelFooter_RowIdPrefix + _headerRowGuid;
    var _panelFooterSequenceNumberId = _gPanelFooter_SequenceNumberIdPefix + _headerRowGuid;
    var _panelFooterInputTxtId = _gPanelFooter_InputTxtIdPrefix + _headerRowGuid;
    var _panelFooterRemoveBtnId = _gPanelFooter_RemoveBtnIdPrefix + _headerRowGuid;
    var _panelFooterInputTxtSapnMessageId = _gPanelFooter_InputTxt_SpanMessageIdPrefix + _headerRowGuid;

    var panelFooterRow = `<div class="row" id="${_panelFooterRowId}">
                  
                     <div class="col-lg-1">
                      <label> <b> Footer </b> </label> <b> <span class="${_panelFooterLabelSpanClass}" id="${_panelFooterSequenceNumberId}" > </span> </b>
                    </div>
                    <div  class="col-lg-9">
                          <div class="form-group">
                            <input type="text" id="${_panelFooterInputTxtId}" name="${_panelFooterInputTxtId}" value="" class="form-control touchspin3 ${_panelFooterInputTxtClass}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" />
                            <span id="${_panelFooterInputTxtSapnMessageId}" class="${_panelFooterSpanMessageClass}"></span>
                            </div>
                    </div>
                   <div  class="col-lg-2">
                        <button type="button" id="${_panelFooterRemoveBtnId}" class="btn btn-sm btn-warning btn-rounded ${_panelFooterRemoveBtnClass}"> <i class="fa fa-sm fa-trash"> </i> Remove </button>
                   </div>
               </div>`;

    var panelFooterContainerDivId = _gPanelFooterContainerDivIdPrefix + panelId;
    $("#" + panelFooterContainerDivId).append(panelFooterRow);


    // sheet_Panel_HeaderRow_AddRemoveBtnEvent(panelId);
    sheet_Panel_FooterRow_AddRemoveBtnEvent(panelId)

    sheet_Panel_FooterRows_SortFooterTextSequenceNumber(panelId);

}
// sheet_Panel_AppendFooterRow(panelId) End



// sheet_Panel_HeaderRow_AddRemoveBtnEvent(panelId) Begin
function sheet_Panel_HeaderRow_AddRemoveBtnEvent(panelId) {

    var _panelHeaderRemoveBtnClass = _gPanelHeader_RemoveBtnClassPrefix + panelId;

    $("." + _panelHeaderRemoveBtnClass).click(function (e) {
        e.preventDefault();

        var _panelHeaderRowRemoveBtnId = $(this).attr("id");
        var _panelHeaderRowRemoveBtnIdPartArray = _panelHeaderRowRemoveBtnId.split("_");
        var _panelHeaderRow_CommonGuid = _panelHeaderRowRemoveBtnIdPartArray[1];
        var _panelHeaderRowId = _gPanelHeader_RowIdPrefix + _panelHeaderRow_CommonGuid;
        $("#" + _panelHeaderRowId).remove();

        // re-call sort sequence number
        // appendPanelHeaderRow_SortHeaderTextSequenceNumber(panelId);
        sheet_Panel_HeaderRows_SortHeaderTextSequenceNumber(panelId);
    });
}
// sheet_Panel_HeaderRow_AddRemoveBtnEvent(panelId) End



// sheet_Panel_HeaderRow_AddRemoveBtnEvent(panelId) Begin
function sheet_Panel_FooterRow_AddRemoveBtnEvent(panelId) {

    var _panelFooterRemoveBtnClass = _gPanelFooter_RemoveBtnClassPrefix + panelId;

    $("." + _panelFooterRemoveBtnClass).click(function (e) {
        e.preventDefault();

        var _panelFooterRowRemoveBtnId = $(this).attr("id");
        var _panelFooterRowRemoveBtnIdPartArray = _panelFooterRowRemoveBtnId.split("_");
        var _panelFooterRow_CommonGuid = _panelFooterRowRemoveBtnIdPartArray[1];

        var _panelFooterRowId = _gPanelFooter_RowIdPrefix + _panelFooterRow_CommonGuid;
        $("#" + _panelFooterRowId).remove();

        // re-call sort sequence number

        sheet_Panel_FooterRows_SortFooterTextSequenceNumber(panelId);
    });
}
// sheet_Panel_HeaderRow_AddRemoveBtnEvent(panelId) End



// sheet_Panel_HeaderRows_SortHeaderTextSequenceNumber(panelId) Begin
function sheet_Panel_HeaderRows_SortHeaderTextSequenceNumber(panelId) {
    var _sequenceNumber = 0;
    var _panelHeaderInputTxtClass = _gPanelHeader_InputTxtClassPrefix + panelId;
    $("." + _panelHeaderInputTxtClass).each(function (index, element) {
        var _inputTxtId = $(this).attr("id");

        var _inputTxtIdPartArray = _inputTxtId.split("_");
        var _headerRowGuid = _inputTxtIdPartArray[1];
        var _panelHeaderSequenceNumberId = _gPanelHeader_SequenceNumberIdPefix + _headerRowGuid;
        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);
        $("#" + _panelHeaderSequenceNumberId).text(_sequenceNumber);
        $(this).attr("data-panel-headersequenceNumber", _sequenceNumber);
    });
}
// sheet_Panel_HeaderRows_SortHeaderTextSequenceNumber(panelId) End



// sheet_Panel_FooterRows_SortHeaderTextSequenceNumber(panelId) Begin
function sheet_Panel_FooterRows_SortFooterTextSequenceNumber(panelId) {
    var _sequenceNumber = 0;
    var _panelFooterInputTxtClass = _gPanelFooter_InputTxtClassPrefix + panelId;

    $("." + _panelFooterInputTxtClass).each(function (index, element) {
        var _inputTxtId = $(this).attr("id");

        var _inputTxtIdPartArray = _inputTxtId.split("_");
        var _headerRowGuid = _inputTxtIdPartArray[1];

        var _panelFooterSequenceNumberId = _gPanelFooter_SequenceNumberIdPefix + _headerRowGuid;
        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);
        $("#" + _panelFooterSequenceNumberId).text(_sequenceNumber);
        $(this).attr("data-panel-footersequenceNumber", _sequenceNumber);
    });
}
// sheet_Panel_FooterRows_SortHeaderTextSequenceNumber(panelId) End




// showModalAlert  Begin
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
// showModalAlert  End




// showModalSaveTemplate  Begin
function showModalSaveTemplate(modalHeaderMessage, modalBodyMessage) {


    var defaultModalHeaderMessage = "Confirm";
    if (modalHeaderMessage != null && modalHeaderMessage != "") {
        defaultModalHeaderMessage = modalHeaderMessage;
    }

    var defaultModalBodyMessage = "";
    if (modalBodyMessage != null && modalBodyMessage != "") {
        defaultModalBodyMessage = modalBodyMessage;
    }

    $("#ModalSaveTemplate_ModalTitle").text(defaultModalHeaderMessage);
    $("#ModalSaveTemplate_ModalBody").html(defaultModalBodyMessage);

    $("#ModalSaveTemplate").modal('show');
}
// showModalAlert  End




// isDeliverableSectionPanelExisted() Begin
function isDeliverableSectionPanelExisted(panelId) {

    var _deliverableSectionPanelCount = 0;
    var _deliverableSectioNameClass = _gDeliverableSectionPanel_SectionNameClassPrefix + panelId;

    $("." + _deliverableSectioNameClass).each(function (index, element) {
        var _panelId = $(this).attr("id");

        _deliverableSectionPanelCount = parseInt(_deliverableSectionPanelCount) + parseInt(1);
    });

    return _deliverableSectionPanelCount;
}
// isDeliverableSectionPanelExisted() End



// isMielstonSectionPanelExisted() Begin
function isMilestoneSectionPanelExisted(panelId) {

    var _milestoneeSectionPanelCount = 0;
    var _milestoneSectioNameClass = _gMilestoneSectionPanel_SectionNameClassPrefix + panelId;

    $("." + _milestoneSectioNameClass).each(function (index, element) {
        var _panelId = $(this).attr("id");
        _milestoneeSectionPanelCount = parseInt(_milestoneeSectionPanelCount) + parseInt(1);
    });

    return _milestoneeSectionPanelCount;
}
// isMilestoneSectionPanelExisted() End



// isKeyPerIndicatorSectionPanelExisted() Begin
function isKeyPerIndicatorSectionPanelExisted(panelId) {

    var _keyPerIndicatorSectionPanelCount = 0;
    var _keyPerIndicatorSectioNameClass = _gKeyPerIndicatorSectionPanel_SectionNameClassPrefix + panelId;

    $("." + _keyPerIndicatorSectioNameClass).each(function (index, element) {
        var _panelId = $(this).attr("id");

        _keyPerIndicatorSectionPanelCount = parseInt(_keyPerIndicatorSectionPanelCount) + parseInt(1);
    });

    return _keyPerIndicatorSectionPanelCount;
}
// isKeyPerIndicatorSectionPanelExisted() End



// sheet_Panel_GetDeliverableTemplate()  Begin
function sheet_Panel_GetDeliverableTemplate(sheetGuid, sectionTypeId, sectionGuid) {

    var _deliverableDeleteBtnClass = _gDeliverableSectionPanel_DeleteBtnClassPrefix + sheetGuid;
    var _deliverableAddNoteBtnClass = _gDeliverableSectionPanel_AddNoteBtnClassPrefix + sheetGuid;

    var _deliverableSectioNameClass = _gDeliverableSectionPanel_SectionNameClassPrefix + sheetGuid;
    var _deliverableSectioTitleClass = _gDeliverableSectionPanel_SectionTitleClassPrefix + sheetGuid;
    var _deliveablePanelAddNoteBtnId = _gDeliverableSectionPanel_AddNoteBtnIdPrefix + sheetGuid;

    var _deliverableSectionRowId = _gDeliverableSectionPanel_RowIdPrefix + sectionGuid;
    var _deliverablePanelDeleteBtnId = _gDeliverableSectionPanel_DeleteBtnIdPrefix + sectionGuid;
    var _deliverableSectioNameId = _gDeliverableSectioPanel_SectionNameIdPrefix + sectionGuid;
    var _deliverableSectioTitleId = _gDeliverableSectioPanel_SectionTitleIdPrefix + sectionGuid;

    var _deliverableNotesContainerDivId = _gDeliverableSectionPanel_NotesContainerDivIdPrefix + sheetGuid;


    var _deliverableTemplate = `<div class="row ${_gDeliverableSectionPanelClass}" id="${_deliverableSectionRowId}" data-sectiontypeid="${sectionTypeId}">
             
                  
                    <div class="panel panel-info">
                        <div style="height:44px; padding:1" class="panel-heading">  <i class="fa fa-info-circle"></i> Deliverable  <button type="button" class="btn btn-sm btn-danger pull-right ${_deliverableDeleteBtnClass}" id="${_deliverablePanelDeleteBtnId}" > <i class="fa fa-trash"></i> </button> <br /></div>
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Name </label> </div>
                                     <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_deliverableSectioNameId}" name="${_deliverableSectioNameId}" class="form-control ${_deliverableSectioNameClass}" data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" >
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>

                             <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Title </label> </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_deliverableSectioTitleId}" name="${_deliverableSectioTitleId}" class="form-control ${_deliverableSectioTitleClass}" data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" >
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>


                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> &nbsp; </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                               &nbsp;
                                            </div>
                                    </div>
                                    <div class="col-lg-2">
                                            <button class="btn btn-info btn-sm btn-rounded ${_deliverableAddNoteBtnClass}" type="button" id="${_deliveablePanelAddNoteBtnId}"> <i class="fa fa-plus fa-sm"></i> Add Note </button>
                                    </div>
                                </div>
                             </div>


                            <div id="${_deliverableNotesContainerDivId}">
                                
                            </div>

                            <div class="row">
                                <!-- New Rows -->
                            </div>


                        </div>
                    </div>
                     
            </div>`;

    return _deliverableTemplate;

}
// sheet_Panel_GetDeliverableTemplate() End



// sheet_Panel_GetMilestoneTemplate()  Begin
function sheet_Panel_GetMilestoneTemplate(sheetGuid, sectionTypeId, sectionGuid) {

    var _milestoneDeleteBtnClass = _gMilestoneSectionPanel_DeleteBtnClassPrefix + sheetGuid;
    var _milestoneAddNoteBtnClass = _gMilestoneSectionPanel_AddNoteBtnClassPrefix + sheetGuid;

    var _milestoneSectioNameClass = _gMilestoneSectionPanel_SectionNameClassPrefix + sheetGuid;
    var _milestoneSectioTitleClass = _gMilestoneSectionPanel_SectionTitleClassPrefix + sheetGuid;
    var _milestonePanelAddNoteBtnId = _gMilestoneSectionPanel_AddNoteBtnIdPrefix + sheetGuid;

    var _milestoneSectionRowId = _gMilestoneSectionPanel_RowIdPrefix + sectionGuid;
    var _milestonePanelDeleteBtnId = _gMilestoneSectionPanel_DeleteBtnIdPrefix + sectionGuid;
    var _milestoneSectioNameId = _gMilestoneSectionPanel_SectionNameIdPrefix + sectionGuid;
    var _milestoneSectioTitleId = _gMilestoneSectionPanel_SectionTitleIdPrefix + sectionGuid;

    var _milestoneNotesContainerDivId = _gMilestoneSectionPanel_NotesContainerDivIdPrefix + sheetGuid;



    var _milestoneTemplate = `<div class="row ${_gMilestoneSectionPanelClass}" id="${_milestoneSectionRowId}" data-sectiontypeid="${sectionTypeId}">
             
                  
                    <div class="panel panel-info">
                        <div style="height:44px; padding:1" class="panel-heading" > <i class="fa fa-info-circle"></i> Milestone  <button type="button" class="btn btn-sm btn-danger pull-right ${_milestoneDeleteBtnClass}" id="${_milestonePanelDeleteBtnId}"> <i class="fa fa-trash"></i> </button> </div>
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Name </label> </div>
                                     <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_milestoneSectioNameId}" name="${_milestoneSectioNameId}" class="form-control ${_milestoneSectioNameClass}" data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}">
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>

                             <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Title </label> </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_milestoneSectioTitleId}" name="${_milestoneSectioTitleId}" class="form-control ${_milestoneSectioTitleClass}" data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" >
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>


                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> &nbsp; </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                               &nbsp;
                                            </div>
                                    </div>
                                    <div class="col-lg-2">
                                            <button class="btn btn-info btn-sm btn-rounded ${_milestoneAddNoteBtnClass}" type="button" id="${_milestonePanelAddNoteBtnId}"> <i class="fa fa-plus fa-sm"></i> Add Note </button>
                                    </div>
                                </div>
                             </div>


                            <div id="${_milestoneNotesContainerDivId}">
                                
                            </div>

                            <div class="row">
                                <!-- New Rows -->
                            </div>


                        </div>
                    </div>
                     
            </div>`;

    return _milestoneTemplate;

}
// sheet_Panel_GetMilestoneTemplate() End



// sheet_Panel_GetKeyPerIndicatorTemplate()  Begin
function sheet_Panel_GetKeyPerIndicatorTemplate(sheetGuid, sectionTypeId, sectionGuid) {

    var _keyPerIndicatorDeleteBtnClass = _gKeyPerIndicatorSectionPanel_DeleteBtnClassPrefix + sheetGuid;
    var _keyPerIndicatorAddNoteBtnClass = _gKeyPerIndicatorSectionPanel_AddNoteBtnClassPrefix + sheetGuid;

    var _keyPerIndicatorSectioNameClass = _gKeyPerIndicatorSectionPanel_SectionNameClassPrefix + sheetGuid;
    var _keyPerIndicatorSectioTitleClass = _gKeyPerIndicatorSectionPanel_SectionTitleClassPrefix + sheetGuid;
    var _keyPerIndicatorPanelAddNoteBtnId = _gKeyPerIndicatorSectionPanel_AddNoteBtnIdPrefix + sheetGuid;

    var _keyPerIndicatorSectionRowId = _gKeyPerIndicatorSectionPanel_RowIdPrefix + sectionGuid;
    var _keyPerIndicatorPanelDeleteBtnId = _gKeyPerIndicatorSectionPanel_DeleteBtnIdPrefix + sectionGuid;
    var _keyPerIndicatorSectioNameId = _gKeyPerIndicatorSectionPanel_SectionNameIdPrefix + sectionGuid;
    var _keyPerIndicatorSectioTitleId = _gKeyPerIndicatorSectionPanel_SectionTitleIdPrefix + sectionGuid;

    var _keyPerIndicatorNotesContainerDivId = _gKeyPerIndicatorSectionPanel_NotesContainerDivIdPrefix + sheetGuid;


    var _keyPerIndicatorTemplate = `<div class="row  ${_gKeyPerIndicatorSectionPanelClass}" id="${_keyPerIndicatorSectionRowId}" data-sectiontypeid="${sectionTypeId}">
             
                  
                    <div class="panel panel-info">
                        <div style="height:44px; padding:1" class="panel-heading" > <i class="fa fa-info-circle"></i> Key Performance Indicator  <button type="button" class="btn btn-sm btn-danger pull-right ${_keyPerIndicatorDeleteBtnClass}" id="${_keyPerIndicatorPanelDeleteBtnId}"> <i class="fa fa-trash"></i> </button> </div>
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Name </label> </div>
                                     <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_keyPerIndicatorSectioNameId}" name="${_keyPerIndicatorSectioNameId}" class="form-control ${_keyPerIndicatorSectioNameClass}"  data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" >
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>

                             <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Title </label> </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_keyPerIndicatorSectioTitleId}" name="${_keyPerIndicatorSectioTitleId}" class="form-control ${_keyPerIndicatorSectioTitleClass}"  data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}">
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>


                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> &nbsp; </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                               &nbsp;
                                            </div>
                                    </div>
                                    <div class="col-lg-2">
                                            <button class="btn btn-info btn-sm btn-rounded ${_keyPerIndicatorAddNoteBtnClass}" type="button" id="${_keyPerIndicatorPanelAddNoteBtnId}"> <i class="fa fa-plus fa-sm"></i> Add Note </button>
                                    </div>
                                </div>
                             </div>


                            <div id="${_keyPerIndicatorNotesContainerDivId}">
                                
                            </div>

                            <div class="row">
                                <!-- New Rows -->
                            </div>


                        </div>
                    </div>
                     
            </div>`;

    return _keyPerIndicatorTemplate;

}
// sheet_Panel_GetKeyPerIndicatorTemplate() End



// sheet_Panel_GetKpiTemplate()  Begin
function sheet_Panel_GetKpiTemplate(sheetGuid, sectionTypeId, sectionGuid) {

    var _kpiDeleteBtnClass = _gKpiSectionPanel_DeleteBtnClassPrefix + sheetGuid;
    var _kpiAddNoteBtnClass = _gKpiSectionPanel_AddNoteBtnClassPrefix + sheetGuid;

    var _kpiSectioNameClass = _gKpiSectionPanel_SectionNameClassPrefix + sheetGuid;
    var _kpiSectioTitleClass = _gKpiSectionPanel_SectionTitleClassPrefix + sheetGuid;
    var _kpiPanelAddNoteBtnId = _gKpiSectionPanel_AddNoteBtnIdPrefix + sheetGuid;

    var _kpiSectionRowId = _gKpiSectionPanel_RowIdPrefix + sectionGuid;
    var _kpiPanelDeleteBtnId = _gKpiSectionPanel_DeleteBtnIdPrefix + sectionGuid;
    var _kpiSectioNameId = _gKpiSectionPanel_SectionNameIdPrefix + sectionGuid;
    var _kpiSectioTitleId = _gKpiSectionPanel_SectionTitleIdPrefix + sectionGuid;

    var _kpiNotesContainerDivId = _gKpiSectionPanel_NotesContainerDivIdPrefix + sheetGuid;

    var _kpiTemplate = `<div class="row ${_gKpiSectionPanelClass} " id="${_kpiSectionRowId}" data-sectiontypeid="${sectionTypeId}">
             
                  
                    <div class="panel panel-info">
                        <div style="height:44px; padding:1"  class="panel-heading" > <i class="fa fa-info-circle"></i> KPI  <button type="button" class="btn btn-sm btn-danger pull-right ${_kpiDeleteBtnClass}" id="${_kpiPanelDeleteBtnId}"> <i class="fa fa-trash"></i> </button> </div>
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Name </label> </div>
                                     <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_kpiSectioNameId}" name="${_kpiSectioNameId}" class="form-control ${_kpiSectioNameClass}" data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}">
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>

                             <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Title </label> </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_kpiSectioTitleId}" name="${_kpiSectioTitleId}" class="form-control ${_kpiSectioTitleClass}" data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}"  >
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>


                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> &nbsp; </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                               &nbsp;
                                            </div>
                                    </div>
                                    <div class="col-lg-2">
                                            <button class="btn btn-info btn-sm btn-rounded ${_kpiAddNoteBtnClass}" type="button" id="${_kpiPanelAddNoteBtnId}"> <i class="fa fa-plus fa-sm"></i> Add Note </button>
                                    </div>
                                </div>
                             </div>


                            <div id="${_kpiNotesContainerDivId}">
                                
                            </div>

                            <div class="row">
                                <!-- New Rows -->
                            </div>


                        </div>
                    </div>
                     
            </div>`;

    return _kpiTemplate;

}
// sheet_Panel_GetKpiTemplate End




// sheet_Panel_GetAdTemplate()  Begin
function sheet_Panel_GetAdTemplate(sheetGuid, sectiontTypeId, sectionGuid) {

    var _adDeleteBtnClass = _gAdSectionPanel_DeleteBtnClassPrefix + sheetGuid;

    var _adSectionNameClass = _gAdSectionPanel_SectionNameClassPrefix + sheetGuid;
    var _adSectionTitleClass = _gAdSectionPanel_SectionTitleClassPrefix + sheetGuid;

    var _adSectionRowId = _gAdSectionPanel_RowIdPrefix + sectionGuid;
    var _adPanelDeleteBtnId = _gAdSectionPanel_DeleteBtnIdPrefix + sectionGuid;

    var _adSectionNameId = _gAdSectionPanel_SectionNameIdPrefix + sectionGuid;
    var _adSectionTitleId = _gAdSectionPanel_SectionTitleIdPrefix + sectionGuid;

    var _adSectionPanelTableId = _gAdSectionPanel_TableIdPrefix + sectionGuid
    var _adSectionPanelTableBodyId = _gAdSectionPanel_TableIdPrefix + sectionGuid + "_Body"

    var _adSectionPanelPlusBtnClass = _gAdSectionPanel_AddTableRowBtnClass;
    var _addSectionPanelPlusBtnId = _gAdSectionPanel_AddTableRowBtnIdPrefix + sectionGuid;

    var _adDrawTableBtnClassPrefix = _gAdSectionPanel_DrawTableBtnClassPrefix + sheetGuid;

    var _adTemplate = `<div class="row ${_gAdSectionPanelClass}" id="${_adSectionRowId}" data-sectiontypeid="${sectiontTypeId}">
             
                  
                    <div class="panel panel-info">
                        <div style="height:44px; padding:1" class="panel-heading" > <i class="fa fa-info-circle"></i> Additional KPI  <button type="button" class="btn btn-sm btn-danger pull-right ${_adDeleteBtnClass}" id="${_adPanelDeleteBtnId}"> <i class="fa fa-trash"></i>  </button> </div>
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Name </label> </div>
                                     <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_adSectionNameId}" name="${_adSectionNameId}" class="form-control ${_adSectionNameClass}" data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}">
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>

                             <div class="row">
                                <div class="col-lg-12">
                                    <div class="col-lg-1"> <label class="control-label">Section Title </label> </div>
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                                <input type="text" id="${_adSectionTitleId}" name="${_adSectionTitleId}" class="form-control ${_adSectionTitleClass}"  data-sheetguid="${sheetGuid}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}">
                                            </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                </div>
                             </div>

                        

                         <!-- Table Row -->
                         <div class="tbl-container ">

                                <div class="row tbl-fixed">

                                     <div class="">
                                        <table id="${_adSectionPanelTableId}" border="1" class="table-striped table-condensed">
                                            <thead>
                                                    <tr>
                                                        <th> Row  </th>
                                                        <th> Col  </th>
                                                        <th> Length Unit </th>
                                                        <th> Alignment </th>
                                                        <th> Data Type </th>
                                                        <th> Data Format </th>
                                                        <th> Value </th>
                                                        <th> Read Only </th>
                                                        <th> Calculation Formula </th>
                                                        <th> Sum Required </th>
                                                        <th> <button type="button" class="${_adSectionPanelPlusBtnClass} btn btn-info btn-sm btn-rounded" id="${_addSectionPanelPlusBtnId}" >  <i class="fa fa-plus"></i>  </button> </th>
                                                    </tr>
                                            </thead>
                                            <tbody id="${_adSectionPanelTableBodyId}">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                         </div>
                         <!-- Table Row -->
                           

                        </div>
                    </div>
                     
            </div>`;

    return _adTemplate;

}
// sheet_Panel_GetAdTemplate End







// register_DeliverableSectionPanel_RemoveBtnEvent
// sheet_Panel_DeliverableSectionPanel_RemoveBtnEvent() Begin
function sheet_Panel_DeliverableSectionPanel_RemoveBtnEvent(panelId) {
    var _deliverableDeleteBtnClass = _gDeliverableSectionPanel_DeleteBtnClassPrefix + panelId;

    // Delete Deliverable Section Panel
    $("." + _deliverableDeleteBtnClass).click(function (e) {
        e.preventDefault();

        var _deliverableDeleteBtnId = $(this).attr("id");
        var _deliverableDeleteBtnIdPartArray = _deliverableDeleteBtnId.split("_");
        var _deliverableSectionPanelRow_CommonGuid = _deliverableDeleteBtnIdPartArray[1];
        var _delivrableSectonRowId = _gDeliverableSectionPanel_RowIdPrefix + _deliverableSectionPanelRow_CommonGuid;
        $("#" + _delivrableSectonRowId).remove();
    });
}
// sheet_Panel_DeliverableSectionPanel_RemoveBtnEvent() End



// sheet_Panel_MilestoneSectionPanel_RemoveBtnEvent() Begin
function sheet_Panel_MilestoneSectionPanel_RemoveBtnEvent(panelId) {
    var _milestoneDeleteBtnClass = _gMilestoneSectionPanel_DeleteBtnClassPrefix + panelId;

    // Delete Deliverable Section Panel
    $("." + _milestoneDeleteBtnClass).click(function (e) {
        e.preventDefault();

        var _milestoneDeleteBtnId = $(this).attr("id");
        var _milestoneDeleteBtnIdPartArray = _milestoneDeleteBtnId.split("_");
        var _milestoneSectionPanelRow_CommonGuid = _milestoneDeleteBtnIdPartArray[1];
        var _milestoneSectonRowId = _gMilestoneSectionPanel_RowIdPrefix + _milestoneSectionPanelRow_CommonGuid;
        $("#" + _milestoneSectonRowId).remove();
    });
}
// sheet_Panel_MilestoneSectionPanel_RemoveBtnEvent() End




// sheet_Panel_KeyPerIndicatorSectionPanel_RemoveBtnEvent() Begin
function sheet_Panel_KeyPerIndicatorSectionPanel_RemoveBtnEvent(panelId) {
    var _keyPerIndicatorDeleteBtnClass = _gKeyPerIndicatorSectionPanel_DeleteBtnClassPrefix + panelId;

    // Delete Deliverable Section Panel
    $("." + _keyPerIndicatorDeleteBtnClass).click(function (e) {
        e.preventDefault();

        var _keyPerIndicatorDeleteBtnId = $(this).attr("id");
        var _keyPerIndicatorDeleteBtnIdPartArray = _keyPerIndicatorDeleteBtnId.split("_");
        var _keyPerIndicatorSectionPanelRow_CommonGuid = _keyPerIndicatorDeleteBtnIdPartArray[1];
        var _keyPerIndicatorSectonRowId = _gKeyPerIndicatorSectionPanel_RowIdPrefix + _keyPerIndicatorSectionPanelRow_CommonGuid;
        $("#" + _keyPerIndicatorSectonRowId).remove();
    });
}
// sheet_Panel_KeyPerIndicatorSectionPanel_RemoveBtnEvent() End






function sheet_Panel_DeliverableSectionPanel_AddNoteBtnEvent(panelId) {

    var _deliverableNoteBtnClass = _gDeliverableSectionPanel_AddNoteBtnClassPrefix + panelId;

    $("." + _deliverableNoteBtnClass).click(function (e) {
        e.preventDefault();
        var _panelAddHeaderBtnId = $(this).attr("id");
        var _panelAddHeaderBtnIdPartArray = _panelAddHeaderBtnId.split("_");
        var _panelId = _panelAddHeaderBtnIdPartArray[1];

        sheet_Panel_DeliverableSectionPanel_AppendNotes(_panelId);

        sheet_Panel_DeliverableSectionPanel_RemoveNoteBtnEvent(_panelId);
    });

}



function sheet_Panel_MilestoneSectionPanel_AddNoteBtnEvent(panelId) {

    var _milestoneNoteBtnClass = _gMilestoneSectionPanel_AddNoteBtnClassPrefix + panelId;

    $("." + _milestoneNoteBtnClass).click(function (e) {
        e.preventDefault();
        var _panelAddHeaderBtnId = $(this).attr("id");
        var _panelAddHeaderBtnIdPartArray = _panelAddHeaderBtnId.split("_");
        var _panelId = _panelAddHeaderBtnIdPartArray[1];


        sheet_Panel_MilestoneSectionPanel_AppendNotes(_panelId);

        sheet_Panel_MilestoneSectionPanel_RemoveNoteBtnEvent(_panelId);

    });

}


function sheet_Panel_MilestoneSectionPanel_SortNoteSequenceNumber(panelId) {

    var _sequenceNumber = 0;
    var _milestoneNoteInputTxtClass = _gMilestoneSectionPanel_SectionNoteInputTxtClassPrefix + panelId;
    $("." + _milestoneNoteInputTxtClass).each(function (index, element) {
        var _inputTxtId = $(this).attr("id");

        var _inputTxtIdPartArray = _inputTxtId.split("_");
        var _rowGuid = _inputTxtIdPartArray[1];
        var _noteSpanSequenceNumberId = _gMilestoneSectionPanel_NoteSequenceNumberIdPrefix + _rowGuid;

        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);

        $("#" + _noteSpanSequenceNumberId).text(_sequenceNumber);

        $(this).attr("data-notesequenceNumber", _sequenceNumber);
    });


}


function sheet_Panel_KeyPerIndicatorSectionPanel_AddNoteBtnEvent(panelId) {

    var _keyPerIndicatorNoteBtnClass = _gKeyPerIndicatorSectionPanel_AddNoteBtnClassPrefix + panelId;

    $("." + _keyPerIndicatorNoteBtnClass).click(function (e) {

        e.preventDefault();

        var _panelAddHeaderBtnId = $(this).attr("id");

        var _panelAddHeaderBtnIdPartArray = _panelAddHeaderBtnId.split("_");

        var _panelId = _panelAddHeaderBtnIdPartArray[1];

        sheet_Panel_KeyPerIndicatorSectionPanel_AppendNotes(_panelId);

        sheet_Panel_KeyPerIndicatorSectionPanel_RemoveNoteBtnEvent(_panelId);


    });

}


function sheet_Panel_KeyPerIndicatorSectionPanel_SortNoteSequenceNumber(panelId) {

    var _sequenceNumber = 0;
    var _keyPerIndicatorNoteInputTxtClass = _gKeyPerIndicatorSectionPanel_SectionNoteInputTxtClassPrefix + panelId;
    $("." + _keyPerIndicatorNoteInputTxtClass).each(function (index, element) {
        var _inputTxtId = $(this).attr("id");

        var _inputTxtIdPartArray = _inputTxtId.split("_");
        var _rowGuid = _inputTxtIdPartArray[1];
        var _noteSpanSequenceNumberId = _gKeyPerIndicatorSectionPanel_NoteSequenceNumberIdPrefix + _rowGuid;

        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);

        $("#" + _noteSpanSequenceNumberId).text(_sequenceNumber);

        $(this).attr("data-notesequenceNumber", _sequenceNumber);
    });



}


function sheet_Panel_DeliverableSectionPanel_AppendNotes(panelId) {


    var _deliverableSectionPanel_NoteContainverDivId = _gDeliverableSectionPanel_NotesContainerDivIdPrefix + panelId;


    var _delivrableSectionPanel_NoteInputTxtClassWithPanelId = _gDeliverableSectionPanel_SectionNoteInputTxtClassPrefix + panelId;

    var _delivrableSectionPanel_NoteInputTxtClass = _gDeliverableSectionPanel_SectionNoteInputTxtClass
    var _deliverableSectionPanel_RemoveNoteBtnClass = _gDeliverableSectionPanel_RemoveNoteBtnClass;

    var _noteRowGuid = UUID();
    var _noteRowId = _gDeliverableSectionPanel_NoteRowIdPrefix + _noteRowGuid;
    var _noteInputTxtId = "NoteInputTxtId_" + _noteRowGuid
    var _noteRemoveBtnId = "NoteRemoveBtnId_" + _noteRowGuid;
    var _noteSequenceNumberId = _gDeliverableSectionPanel_NoteSequenceNumberIdPrefix + _noteRowGuid;

    var _delivrableSectionPanelNoteRow = `<div class="row" id="${_noteRowId}">
                     <div class="col-lg-12">
                              <div class="col-lg-1">
                                      <label>  <b>Note </b> </label> <b><span class="${_gDeliverableSectionPanel_LabelNoteSpanClass}" id="${_noteSequenceNumberId}"> </sapn>  </b>
                              </div>
                              <div  class="col-lg-9">
                                      <div class="form-group">
                                        <input type="text" id="${_noteInputTxtId}" name="${_noteInputTxtId}" value="" class="form-control touchspin3 ${_delivrableSectionPanel_NoteInputTxtClassWithPanelId} ${_delivrableSectionPanel_NoteInputTxtClass}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" />
                                      </div>
                              </div>

                               <div  class="col-lg-2">
                                    <button type="button" id="${_noteRemoveBtnId}" class="btn btn-sm btn-warning btn-rounded ${_deliverableSectionPanel_RemoveNoteBtnClass}"> <i class="fa fa-sm fa-trash"> </i> Remove </button>
                              </div>
                    </div>
            </div>`;


    $("#" + _deliverableSectionPanel_NoteContainverDivId).append(_delivrableSectionPanelNoteRow);

    sheet_Panel_DeliverableSectionPanel_SortNoteSequenceNumber(panelId);
}


function sheet_Panel_DeliverableSectionPanel_SortNoteSequenceNumber(panelId) {

    var _sequenceNumber = 0;
    var _deliverableNoteInputTxtClass = _gDeliverableSectionPanel_SectionNoteInputTxtClassPrefix + panelId;
    $("." + _deliverableNoteInputTxtClass).each(function (index, element) {
        var _inputTxtId = $(this).attr("id");

        var _inputTxtIdPartArray = _inputTxtId.split("_");
        var _rowGuid = _inputTxtIdPartArray[1];
        var _noteSpanSequenceNumberId = _gDeliverableSectionPanel_NoteSequenceNumberIdPrefix + _rowGuid;

        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);

        $("#" + _noteSpanSequenceNumberId).text(_sequenceNumber);

        $(this).attr("data-notesequenceNumber", _sequenceNumber);
    });



}


function sheet_Panel_MilestoneSectionPanel_AppendNotes(panelId) {


    var _milestoneSectionPanel_NoteContainverDivId = _gMilestoneSectionPanel_NotesContainerDivIdPrefix + panelId;


    var _milestoneSectionPanel_NoteInputTxtClassWithPanelId = _gMilestoneSectionPanel_SectionNoteInputTxtClassPrefix + panelId;

    var _milestoneSectionPanel_NoteInputTxtClass = _gMilestoneSectionPanel_SectionNoteInputTxtClass

    var _milestoneSectionPanel_RemoveNoteBtnClass = _gMilestoneSectionPanel_RemoveNoteBtnClass;

    var _noteRowGuid = UUID();
    var _noteRowId = _gMilestoneSectionPanel_NoteRowIdPrefix + _noteRowGuid;
    var _noteInputTxtId = "NoteInputTxtId_" + _noteRowGuid
    var _noteRemoveBtnId = "NoteRemoveBtnId_" + _noteRowGuid;
    var _noteSequenceNumberId = _gMilestoneSectionPanel_NoteSequenceNumberIdPrefix + _noteRowGuid;

    var _milestoneSectionPanelNoteRow = `<div class="row" id="${_noteRowId}">
                     <div class="col-lg-12">
                              <div class="col-lg-1">
                                      <label>  <b>Note </b> </label> <b><span class="${_gMilestoneSectionPanel_LabelNoteSpanClass}" id="${_noteSequenceNumberId}"> </sapn>  </b>
                              </div>
                              <div  class="col-lg-9">
                                      <div class="form-group">
                                        <input type="text" id="${_noteInputTxtId}" name="${_noteInputTxtId}" value="" class="form-control touchspin3 ${_milestoneSectionPanel_NoteInputTxtClassWithPanelId} ${_milestoneSectionPanel_NoteInputTxtClass}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" />
                                      </div>
                              </div>

                               <div  class="col-lg-2">
                                    <button type="button" id="${_noteRemoveBtnId}" class="btn btn-sm btn-warning btn-rounded ${_milestoneSectionPanel_RemoveNoteBtnClass}"> <i class="fa fa-sm fa-trash"> </i> Remove </button>
                              </div>
                    </div>
            </div>`;


    $("#" + _milestoneSectionPanel_NoteContainverDivId).append(_milestoneSectionPanelNoteRow);

    sheet_Panel_MilestoneSectionPanel_SortNoteSequenceNumber(panelId)

}


function sheet_Panel_KeyPerIndicatorSectionPanel_AppendNotes(panelId) {


    var _keyPerIndicatorSectionPanel_NoteContainverDivId = _gKeyPerIndicatorSectionPanel_NotesContainerDivIdPrefix + panelId;


    var _keyPerIndicatorSectionPanel_NoteInputTxtClassWithPanelId = _gKeyPerIndicatorSectionPanel_SectionNoteInputTxtClassPrefix + panelId;
    var _keyPerIndicatorSectionPanel_NoteInputTxtClass = _gKeyPerIndicatorSectionPanel_SectionNoteInputTxtClass
    var _keyPerIndicatorSectionPanel_RemoveNoteBtnClass = _gKeyPerIndicatorSectionPanel_RemoveNoteBtnClass;

    var _noteRowGuid = UUID();
    var _noteRowId = _gKeyPerIndicatorSectionPanel_NoteRowIdPrefix + _noteRowGuid;
    var _noteInputTxtId = "NoteInputTxtId_" + _noteRowGuid
    var _noteRemoveBtnId = "NoteRemoveBtnId_" + _noteRowGuid;
    var _noteSequenceNumberId = _gKeyPerIndicatorSectionPanel_NoteSequenceNumberIdPrefix + _noteRowGuid;
    var _keyPerIndicatorSectionPanelNoteRow = `<div class="row" id="${_noteRowId}">
                     <div class="col-lg-12">
                              <div class="col-lg-1">
                                       <label>  <b>Note </b> </label> <b><span class="${_gKeyPerIndicatorSectionPanel_LabelNoteSpanClass}" id="${_noteSequenceNumberId}"> </sapn>  </b>
                              </div>
                              <div  class="col-lg-9">
                                      <div class="form-group">
                                        <input type="text" id="${_noteInputTxtId}" name="${_noteInputTxtId}" value="" class="form-control touchspin3 ${_keyPerIndicatorSectionPanel_NoteInputTxtClassWithPanelId} ${_keyPerIndicatorSectionPanel_NoteInputTxtClass}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" />
                                      </div>
                              </div>

                               <div  class="col-lg-2">
                                    <button type="button" id="${_noteRemoveBtnId}" class="btn btn-sm btn-warning btn-rounded ${_keyPerIndicatorSectionPanel_RemoveNoteBtnClass}"> <i class="fa fa-sm fa-trash"> </i> Remove </button>
                              </div>
                    </div>
            </div>`;


    $("#" + _keyPerIndicatorSectionPanel_NoteContainverDivId).append(_keyPerIndicatorSectionPanelNoteRow);

    sheet_Panel_KeyPerIndicatorSectionPanel_SortNoteSequenceNumber(panelId);

}


function sheet_Panel_DeliverableSectionPanel_RemoveNoteBtnEvent(panelId) {


    $("." + _gDeliverableSectionPanel_RemoveNoteBtnClass).click(function (e) {
        e.preventDefault();
        var _btnId = $(this).attr("id");
        var _btnIdPartArray = _btnId.split("_");
        var _noteRowGuid = _btnIdPartArray[1];
        var _noteRowId = _gDeliverableSectionPanel_NoteRowIdPrefix + _noteRowGuid;
        $("#" + _noteRowId).remove();

        sheet_Panel_DeliverableSectionPanel_SortNoteSequenceNumber(panelId);
    });

}



function sheet_Panel_MilestoneSectionPanel_RemoveNoteBtnEvent(panelId) {


    $("." + _gMilestoneSectionPanel_RemoveNoteBtnClass).click(function (e) {
        e.preventDefault();
        var _btnId = $(this).attr("id");
        var _btnIdPartArray = _btnId.split("_");
        var _noteRowGuid = _btnIdPartArray[1];
        var _noteRowId = _gMilestoneSectionPanel_NoteRowIdPrefix + _noteRowGuid;
        $("#" + _noteRowId).remove();

        sheet_Panel_MilestoneSectionPanel_SortNoteSequenceNumber(panelId);
    });

}



function sheet_Panel_KeyPerIndicatorSectionPanel_RemoveNoteBtnEvent(panelId) {


    $("." + _gKeyPerIndicatorSectionPanel_RemoveNoteBtnClass).click(function (e) {
        e.preventDefault();
        var _btnId = $(this).attr("id");
        var _btnIdPartArray = _btnId.split("_");
        var _noteRowGuid = _btnIdPartArray[1];
        var _noteRowId = _gKeyPerIndicatorSectionPanel_NoteRowIdPrefix + _noteRowGuid;
        $("#" + _noteRowId).remove();

        sheet_Panel_KeyPerIndicatorSectionPanel_SortNoteSequenceNumber(panelId);
    });

}



function isKpiSectionPanelExisted(panelId) {

    var _kpiSectionPanelCount = 0;
    var _kpiSectioNameClass = _gKpiSectionPanel_SectionNameClassPrefix + panelId;

    $("." + _kpiSectioNameClass).each(function (index, element) {
        var _panelId = $(this).attr("id");

        _kpiSectionPanelCount = parseInt(_kpiSectionPanelCount) + parseInt(1);

    });

    return _kpiSectionPanelCount;
}



function sheet_Panel_KpiSectionPanel_RemoveBtnEvent(panelId) {
    var _kpiDeleteBtnClass = _gKpiSectionPanel_DeleteBtnClassPrefix + panelId;

    // Delete Deliverable Section Panel
    $("." + _kpiDeleteBtnClass).click(function (e) {
        e.preventDefault();

        var _kpiDeleteBtnId = $(this).attr("id");
        var _kpiDeleteBtnIdPartArray = _kpiDeleteBtnId.split("_");
        var _kpiSectionPanelRow_CommonGuid = _kpiDeleteBtnIdPartArray[1];
        var _kpiSectonRowId = _gKpiSectionPanel_RowIdPrefix + _kpiSectionPanelRow_CommonGuid;
        $("#" + _kpiSectonRowId).remove();
    });
}



function sheet_Panel_KpiSectionPanel_AddNoteBtnEvent(panelId) {

    var _kpiNoteBtnClass = _gKpiSectionPanel_AddNoteBtnClassPrefix + panelId;

    $("." + _kpiNoteBtnClass).click(function (e) {

        e.preventDefault();

        var _panelAddHeaderBtnId = $(this).attr("id");

        var _panelAddHeaderBtnIdPartArray = _panelAddHeaderBtnId.split("_");

        var _panelId = _panelAddHeaderBtnIdPartArray[1];

        sheet_Panel_KpiSectionPanel_AppendNotes(_panelId);

        sheet_panel_KpiSectionPanel_RemoveNoteBtnEvent(_panelId);
    });

}



function sheet_Panel_KpiSectionPanel_SortNoteSequenceNumber(panelId) {
    var _sequenceNumber = 0;
    var _kpiNoteInputTxtClass = _gKpiSectionPanel_SectionNoteInputTxtClassPrefix + panelId;

    $("." + _kpiNoteInputTxtClass).each(function (index, element) {
        var _inputTxtId = $(this).attr("id");

        var _inputTxtIdPartArray = _inputTxtId.split("_");
        var _rowGuid = _inputTxtIdPartArray[1];
        var _noteSpanSequenceNumberId = _gKpiSectionPanel_NoteSequenceNumberIdPrefix + _rowGuid;

        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);

        $("#" + _noteSpanSequenceNumberId).text(_sequenceNumber);

        $(this).attr("data-notesequenceNumber", _sequenceNumber);
    });
}



function sheet_Panel_KpiSectionPanel_AppendNotes(panelId) {


    var _kpiSectionPanel_NoteContainverDivId = _gKpiSectionPanel_NotesContainerDivIdPrefix + panelId;


    var _kpiSectionPanel_NoteInputTxtClassWithPanelId = _gKpiSectionPanel_SectionNoteInputTxtClassPrefix + panelId;
    var _kpiSectionPanel_NoteInputTxtClass = _gKpiSectionPanel_SectionNoteInputTxtClass

    var _kpiSectionPanel_RemoveNoteBtnClass = _gKpiSectionPanel_RemoveNoteBtnClass;

    var _noteRowGuid = UUID();
    var _noteRowId = _gKpiSectionPanel_NoteRowIdPrefix + _noteRowGuid;
    var _noteInputTxtId = "NoteInputTxtId_" + _noteRowGuid
    var _noteRemoveBtnId = "NoteRemoveBtnId_" + _noteRowGuid;
    var _noteSequenceNumberId = _gKpiSectionPanel_NoteSequenceNumberIdPrefix + _noteRowGuid;

    var _kpiSectionPanelNoteRow = `<div class="row" id="${_noteRowId}">
                     <div class="col-lg-12">
                              <div class="col-lg-1">
                                        <label>  <b>Note </b> </label> <b><span class="${_gKpiSectionPanel_LabelNoteSpanClass}" id="${_noteSequenceNumberId}"> </sapn>  </b>
                              </div>
                              <div  class="col-lg-9">
                                      <div class="form-group">
                                        <input type="text" id="${_noteInputTxtId}" name="${_noteInputTxtId}" value="" class="form-control touchspin3 ${_kpiSectionPanel_NoteInputTxtClassWithPanelId} ${_kpiSectionPanel_NoteInputTxtClass}" maxlength="${_gReportTemplate_InputTextBox_MaxLength}" />
                                      </div>
                              </div>

                               <div  class="col-lg-2">
                                    <button type="button" id="${_noteRemoveBtnId}" class="btn btn-sm btn-warning btn-rounded ${_kpiSectionPanel_RemoveNoteBtnClass}"> <i class="fa fa-sm fa-trash"> </i> Remove </button>
                              </div>
                    </div>
            </div>`;


    $("#" + _kpiSectionPanel_NoteContainverDivId).append(_kpiSectionPanelNoteRow);

    sheet_Panel_KpiSectionPanel_SortNoteSequenceNumber(panelId);

}



function sheet_panel_KpiSectionPanel_RemoveNoteBtnEvent(panelId) {



    $("." + _gKpiSectionPanel_RemoveNoteBtnClass).click(function (e) {
        e.preventDefault();
        var _btnId = $(this).attr("id");
        var _btnIdPartArray = _btnId.split("_");
        var _noteRowGuid = _btnIdPartArray[1];
        var _noteRowId = _gKpiSectionPanel_NoteRowIdPrefix + _noteRowGuid;
        $("#" + _noteRowId).remove();

        sheet_Panel_KpiSectionPanel_SortNoteSequenceNumber(panelId);
    });

}



function sheet_Panel_AdSectionPanel_RemoveBtnEvent(panelId) {
    var _adDeleteBtnClass = _gAdSectionPanel_DeleteBtnClassPrefix + panelId;

    // Delete Deliverable Section Panel
    $("." + _adDeleteBtnClass).click(function (e) {
        e.preventDefault();

        var _adDeleteBtnId = $(this).attr("id");
        var _adDeleteBtnIdPartArray = _adDeleteBtnId.split("_");
        var _adSectionPanelRow_CommonGuid = _adDeleteBtnIdPartArray[1];
        var _adSectonRowId = _gAdSectionPanel_RowIdPrefix + _adSectionPanelRow_CommonGuid;
        $("#" + _adSectonRowId).remove();
    });
}



function sheet_Panel_AdSectionPanel_AddTableRowBtnEvent(sheetGuid, sectionGuid) {

    $("." + _gAdSectionPanel_AddTableRowBtnClass).click(function (e) {

        e.preventDefault();

        e.stopImmediatePropagation(); // VIP Note

        var _addBtnId = $(this).attr("id")
        var _addBtnIdPartArray = _addBtnId.split("_");
        var _commonGuid = _addBtnIdPartArray[1];
        var _adSectionPanelTableBodyId = _gAdSectionPanel_TableIdPrefix + _commonGuid + "_Body"

        var _trRow = AdHocSectionPanel_GetTableTrRow(sheetGuid, sectionGuid);

        $("#" + _adSectionPanelTableBodyId).append(_trRow);

        sheet_Panel_AdSectionPanel_SortTablRows_SequenceNumber(sheetGuid, sectionGuid)

        sheet_Panel_AdSectionPanel_RemoveTableRowBtnEvent(sheetGuid, sectionGuid);


    });

}


function sheet_Panel_AdSectionPanel_SortTablRows_SequenceNumber(sheetGuid, sectionGuid) {
    var _trClass = "trClass_" + sheetGuid + "_" + sectionGuid;
    var _sequenceNumber = 0;

    $("." + _trClass).each(function (index, element) {
        var _trId = $(this).attr("id");

        _sequenceNumber = parseInt(_sequenceNumber) + parseInt(1);
        $(this).attr("data-sequenceNumber", _sequenceNumber);
    });

}



function sheet_Panel_AdSectionPanel_RemoveTableRowBtnEvent(sheetGuid, sectionGuid) {


    $("." + _gAdSectionPanel_RemoveTableRowBtnClass).click(function (e) {
        e.preventDefault();

        var _addBtnId = $(this).attr("id")
        var _addBtnIdPartArray = _addBtnId.split("_");
        var _commonGuid = _addBtnIdPartArray[1];
        var _rowId = "RowId_" + _commonGuid;

        $("#" + _rowId).remove();

        sheet_Panel_AdSectionPanel_SortTablRows_SequenceNumber(sheetGuid, sectionGuid);
    });

}



function AdHocSectionPanel_GetTableTrRow(sheetGuid, sectionGuid) {

    var newTrRowGuid = UUID();
    var _trRowId = "RowId_" + newTrRowGuid;
    var _trRowRemoveBtnId = "RemoveBtnId_" + newTrRowGuid;
    var _inputSelect_RowId = "InputSelectRowId_" + newTrRowGuid;
    var _inputSelect_ColId = "InputSelectColId_" + newTrRowGuid;
    var _inputSelect_LengthUnitId = "InputSelectLengthUnitId_" + newTrRowGuid;
    var _inputSelect_AlignmentId = "InputSelectAlignmentId_" + newTrRowGuid;
    var _inputSelect_DataTypeId = "InputSelectDataTypeId_" + newTrRowGuid;
    var _inputSelect_DataFormatId = "InputSelectDataFormatId_" + newTrRowGuid;
    var _inputTextArea_ValueId = "InputTextAreaValueId_" + newTrRowGuid;
    var _inputSelect_ReadOnlyId = "InputSelectReadOnlyId_" + newTrRowGuid;
    var _inputText_FormulaId = "InputTextFormulaId_" + newTrRowGuid;
    var _inputSelect_SumRequiredId = "InputSelectSumRequiredId_" + newTrRowGuid;

    var _trClass = "trClass_" + sheetGuid + "_" + sectionGuid;

    var _trRowTemplate = `
        <tr id = "${_trRowId}" class="${_trClass}">
             <td>
                    <select id="${_inputSelect_RowId}" name="${_inputSelect_RowId}" class="form-control">
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            <option value="5"> 5 </option>
                            <option value="6"> 6 </option>
                            <option value="7"> 7 </option>
                            <option value="8"> 8 </option>
                            <option value="9"> 9 </option>
                            <option value="10"> 10 </option>
                            <option value="11"> 11 </option>
                            <option value="12"> 12 </option>
                            <option value="13"> 13 </option>
                            <option value="14"> 14 </option>
                            <option value="15"> 15 </option>
                            <option value="16"> 16 </option>
                            <option value="17"> 17 </option>
                            <option value="18"> 18 </option>
                            <option value="19"> 19 </option>
                            <option value="20"> 20 </option>
                            <option value="21"> 21 </option>
                            <option value="22"> 22 </option>
                            <option value="23"> 23 </option>
                            <option value="24"> 24 </option>
                            <option value="25"> 25 </option>
                            <option value="26"> 26 </option>
                            <option value="27"> 27 </option>
                            <option value="28"> 28 </option>
                            <option value="29"> 29 </option>
                            <option value="30"> 30 </option>
                            <option value="31"> 31 </option>
                            <option value="32"> 32 </option>
                            <option value="33"> 33 </option>
                            <option value="34"> 34 </option>
                            <option value="35"> 35 </option>
                            <option value="36"> 36 </option>
                            <option value="37"> 37 </option>
                            <option value="38"> 38 </option>
                            <option value="39"> 39 </option>
                            <option value="40"> 40 </option>
                            <option value="41"> 41 </option>
                            <option value="42"> 42 </option>
                            <option value="43"> 43 </option>
                            <option value="44"> 44 </option>
                            <option value="45"> 45 </option>
                            <option value="46"> 46 </option>
                            <option value="47"> 47 </option>
                            <option value="48"> 48 </option>
                            <option value="49"> 49 </option>
                            <option value="50"> 50 </option>
                            <option value="51"> 51 </option>
                            <option value="52"> 52 </option>
                            <option value="53"> 53 </option>
                            <option value="54"> 54 </option>
                            <option value="55"> 55 </option>
                            <option value="56"> 56 </option>
                            <option value="57"> 57 </option>
                            <option value="58"> 58 </option>
                            <option value="59"> 59 </option>
                            <option value="60"> 60 </option>
                            <option value="61"> 61 </option>
                            <option value="62"> 62 </option>
                            <option value="63"> 63 </option>
                            <option value="64"> 64 </option>
                            <option value="65"> 65 </option>
                            <option value="66"> 66 </option>
                            <option value="67"> 67 </option>
                            <option value="68"> 68 </option>
                            <option value="69"> 69 </option>
                            <option value="70"> 70 </option>
                            <option value="71"> 71 </option>
                            <option value="72"> 72 </option>
                            <option value="73"> 73 </option>
                            <option value="74"> 74 </option>
                            <option value="75"> 75 </option>
                            <option value="76"> 76 </option>
                            <option value="77"> 77 </option>
                            <option value="78"> 78 </option>
                            <option value="79"> 79 </option>
                            <option value="80"> 80 </option>
                            <option value="81"> 81 </option>
                            <option value="82"> 82 </option>
                            <option value="83"> 83 </option>
                            <option value="84"> 84 </option>
                            <option value="85"> 85 </option>
                            <option value="86"> 86 </option>
                            <option value="87"> 87 </option>
                            <option value="88"> 88 </option>
                            <option value="89"> 89 </option>
                            <option value="90"> 90 </option>
                            <option value="91"> 91 </option>
                            <option value="92"> 92 </option>
                            <option value="93"> 93 </option>
                            <option value="94"> 94 </option>
                            <option value="95"> 95 </option>
                            <option value="96"> 96 </option>
                            <option value="97"> 97 </option>
                            <option value="98"> 98 </option>
                            <option value="99"> 99 </option>
                            <option value="100"> 100 </option>
                     </select>
             </td>

             <td>
                    <select id="${_inputSelect_ColId}" name="${_inputSelect_ColId}" class="form-control">
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            <option value="5"> 5 </option>
                            <option value="6"> 6 </option>
                            <option value="7"> 7 </option>
                            <option value="8"> 8 </option>
                            <option value="9"> 9 </option>
                            <option value="10"> 10 </option>
                            <option value="11"> 11 </option>
                            <option value="12"> 12 </option>
                            <option value="13"> 13 </option>
                            <option value="14"> 14 </option>
                            <option value="15"> 15 </option>
                            <option value="16"> 16 </option>
                            <option value="17"> 17 </option>
                            <option value="18"> 18 </option>
                            <option value="19"> 19 </option>
                            <option value="20"> 20 </option>
                            <option value="21"> 21 </option>
                            <option value="22"> 22 </option>
                            <option value="23"> 23 </option>
                            <option value="24"> 24 </option>
                            <option value="25"> 25 </option>
                            <option value="26"> 26 </option>
                            <option value="27"> 27 </option>
                            <option value="28"> 28 </option>
                            <option value="29"> 29 </option>
                            <option value="30"> 30 </option>
                            <option value="31"> 31 </option>
                            <option value="32"> 32 </option>
                            <option value="33"> 33 </option>
                            <option value="34"> 34 </option>
                            <option value="35"> 35 </option>
                            <option value="36"> 36 </option>
                            <option value="37"> 37 </option>
                            <option value="38"> 38 </option>
                            <option value="39"> 39 </option>
                            <option value="40"> 40 </option>
                            <option value="41"> 41 </option>
                            <option value="42"> 42 </option>
                            <option value="43"> 43 </option>
                            <option value="44"> 44 </option>
                            <option value="45"> 45 </option>
                            <option value="46"> 46 </option>
                            <option value="47"> 47 </option>
                            <option value="48"> 48 </option>
                            <option value="49"> 49 </option>
                            <option value="50"> 50 </option>

                     </select>
             </td>

              <td>
                   <select id="${_inputSelect_LengthUnitId}" name="${_inputSelect_LengthUnitId}" class="form-control">
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            <option value="5"> 5 </option>
                            <option value="6"> 6 </option>
                            <option value="7"> 7 </option>
                            <option value="8"> 8 </option>
                            <option value="9"> 9 </option>
                            <option value="10"> 10 </option>
                            <option value="11"> 11 </option>
                            <option value="12"> 12 </option>
                            <option value="13"> 13 </option>
                            <option value="14"> 14 </option>
                            <option value="15"> 15 </option>
                            <option value="16"> 16 </option>
                            <option value="17"> 17 </option>
                            <option value="18"> 18 </option>
                            <option value="19"> 19 </option>
                            <option value="20"> 20 </option>
                     </select>
             </td>

                <td>
                   <select id="${_inputSelect_AlignmentId}" name="${_inputSelect_AlignmentId}" class="form-control">
                            <option value="1"> Left </option>
                            <option value="2"> Center </option>
                            <option value="3"> Right </option>
                     </select>
               </td>

                 <td>
                        <select  id="${_inputSelect_DataTypeId}" name="${_inputSelect_DataTypeId}"  class="form-control">
                            <option value="${_gDataType_Text}">Text</option>
                            <option value="${_gDataType_Numeric}">Numeric</option>
                            <option value="${_gDataType_Decimal}">Decimal</option>
                            <option value="${_gDataType_Date}">Date</option>
                        </select>
                </td>

                
                <td>
                        <select  id="${_inputSelect_DataFormatId}" name="${_inputSelect_DataFormatId}"  class="form-control">
                            <option value="0">Non</option>
                            <option value="1">Date</option>
                            <option value="2">Currency</option>
                            <option value="3">Percentage</option>
                        </select>
                </td>


                <td>
                        
                        <textarea id="${_inputTextArea_ValueId}" name="${_inputTextArea_ValueId}" class="form-control" rows="1" style="resize:none"></textarea>
                       
                </td>
                <td>
                        <select  id="${_inputSelect_ReadOnlyId}" name="${_inputSelect_ReadOnlyId}"  class="form-control">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                        </select>
                </td>

                <td>
                        <input type="text" id="${_inputText_FormulaId}" name="${_inputText_FormulaId}" class="form-control"  maxlength="${_gReportTemplate_InputTextBox_AdHoc_MaxLength}"/>

                </td>

                <td>
                        <select  id="${_inputSelect_SumRequiredId}" name="${_inputSelect_SumRequiredId}"  class="form-control">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                        </select>
                </td>

                <td style="text-align: center; vertical-align: middle;">
                    <button type="button" class="${_gAdSectionPanel_RemoveTableRowBtnClass}  btn-rounded btn btn-sm btn-danger" id="${_trRowRemoveBtnId}" >  <i class="fa fa-minus-square"> </i> </button>
                </td>

        </tr>

    `;

    return _trRowTemplate;
}




function EditMode_GetTemplate_Begin(fundingDetailId, reportTemplateId) {
    ReportTemplate_VM.FundingDetailID = fundingDetailId;
    ReportTemplate_VM.ReportTemplateID = reportTemplateId;

    console.log("Before EditMode_GetTemplate_Begin() Post Api Object ");
    console.log(ReportTemplate_VM);


    $.ajax({
        url: '/api/ReportTemplateApi/GetTemplate/',
        type: 'POST',
        data: JSON.stringify(ReportTemplate_VM),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, xhr) {

            if (data.isExecuteSuccess == "1") {
                console.log("EditMode_GetTemplate_Begin() Api return Object Below :");
                console.log(data.returnResult);
                EditMode_DisplayTemplate(data.returnResult);
            } else {
                showModalAlert("Get Template", "Get Template Failed .");
            }

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$("#HospitalRevenueLineModal_TargetMessage").html(err.message);
            //$("#HospitalRevenueLineModal_TargetMessage").addClass("text-danger");
            console.warn("/api/ReportTemplateApi/SaveTemplate/" + err.message);
            // console.warn("/api/ReportTemplateApi/SaveTemplate/" + err.message);

        }
    });
}



function EditMode_DisplayTemplate(templateInfo) {

    //const cars = [
    //    { type: "Volvo", year: 2016 },
    //    { type: "Saab", year: 2001 },
    //    { type: "BMW", year: 2010 }
    //];
    //cars.sort(function (a, b) { return a.year - b.year });

    // Assign Report Title
    if (templateInfo.reportTitle != null && templateInfo.reportTitle != "") {
        $("#ReportTitle").val(templateInfo.reportTitle);
    }

    // Assign Report Frequency
    if (templateInfo.reportFrequency != null && templateInfo.reportFrequency != "") {
        $("#ReportingFrequencyDDL").val(templateInfo.reportFrequency);
    }

    if (templateInfo.reportFrequency == _gReportFrequency_OneTime) {
        $("#OneTimeDateColumn").show();
        // $("#OneTimeDateTxt").val(templateInfo.reportDueDateStr);
        // reportDueDate: "2022-06-14T00:00:00"
        // reportDueDateStr: "6/14/2022"
        // MM//dd/yyyy
        if (templateInfo.reportDueDate != null && templateInfo.reportDueDate != "") {
            var _yyyyMMddArr = templateInfo.reportDueDate.split('T');
            var _dateArr = _yyyyMMddArr[0].split('-');
            var _newFormattedDate = _dateArr[1] + '/' + _dateArr[2] + '/' + _dateArr[0];
            $("#OneTimeDateTxt").val(_newFormattedDate);
        }

    }




    const _sheetObjArr = templateInfo.sheets;
    _sheetObjArr.sort(function (a, b) { return a.sheetSequenceNumber - b.sheetSequenceNumber });


    for (var i = 0; i < _sheetObjArr.length; i++) {
        var _sheetObj = _sheetObjArr[i];

        EditMode_DisplaySheet(_sheetObj);
    }

}




function EditMode_DisplaySheet(sheetObj) {


    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;


    var _panelTemplate = sheet_GetPanelTemplate(_sheetGuid, _sheetId);

    $("#" + _gPanelContainerDivId).append(_panelTemplate);

    // registerPanelDeleteBtnEvent();
    sheet_Panel_RegiterDeleteBtnEvent()

    panelTemplates_SortSequenceNumber();

    // addPanelHeaderBtnClickEvent();
    sheet_Panel_RegiterAddHeaderBtnEvent();

    // addPanelSectionBtnClickEvent();
    sheet_Panel_RegisterAddSectionBtnEvent();

    sheet_Panel_RegiterAddFooterBtnEvent();


    // Assign SheetName 
    var _panelSheetNameId = _gPanelSheetNameIdPrefix + _sheetGuid;
    $("#" + _panelSheetNameId).val(sheetObj.sheetName);


    // Assign SheetTitle
    var _panelSheetTitleId = _gPanelSheetTitleIdPrefix + _sheetGuid;
    $("#" + _panelSheetTitleId).val(sheetObj.sheetTitle);

    EditMode_DisplaySheet_Headers(sheetObj);

    EditMode_DisplaySheet_Footers(sheetObj);

    // Display DeliverableSection
    EditMode_DisplaySheet_DeliverableSection(sheetObj);

    // Display MilestoneSection
    EditMode_DisplaySheet_MilestoneSection(sheetObj);

    // Display KeyPerIndicatorSection
    EditMode_DisplaySheet_KeyPerIndicatorSection(sheetObj);

    // Display KpiSection
    EditMode_DisplaySheet_KpiSection(sheetObj);

    // Display AdHocSections
    EditMode_DisplaySheet_AdHocSections(sheetObj);




}


function EditMode_DisplaySheet_Headers(sheetObj) {
    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;

    // Trigger AddHeaderBtn
    var _panelAddHeaderBtnId = _gPanelAddHeaderBtnIdPrefix + _sheetGuid;
    var _sheetHeaderLength = sheetObj.sheetHeaders.length;

    for (var i = 0; i < _sheetHeaderLength; i++) {
        $("#" + _panelAddHeaderBtnId).trigger("click");
    }

    var _gSheetPanelHeaderClass = _gPanelHeader_InputTxtClassPrefix + _sheetGuid;

    $("." + _gSheetPanelHeaderClass).each(function (sheetHeaderIndex, sheetHeaderElement) {


        // var _header_Text = $(this).val();

        var _sheetHeader_SequenceNumber = $(this).data("panel-headersequencenumber");

        for (var i = 0; i < sheetObj.sheetHeaders.length; i++) {
            var _headerItemObj = sheetObj.sheetHeaders[i];
            if (_headerItemObj.sheetHeader_SequenceNumber == _sheetHeader_SequenceNumber) {
                $(this).val(_headerItemObj.sheetHeader_Text);
            }
        }

    });

}



function EditMode_DisplaySheet_Footers(sheetObj) {
    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;

    // Trigger AddFooterBtn
    var _panelAddFooterBtnId = _gPanelAddFooterBtnIdPrefix + _sheetGuid;
    var _sheetFooterrLength = sheetObj.sheetFooters.length;

    for (var i = 0; i < _sheetFooterrLength; i++) {
        $("#" + _panelAddFooterBtnId).trigger("click");
    }

    var _gSheetPanelFooterClass = _gPanelFooter_InputTxtClassPrefix + _sheetGuid;

    $("." + _gSheetPanelFooterClass).each(function (sheetFooterIndex, sheetFooterElement) {

        // var _header_Text = $(this).val();
        var _sheetHeader_SequenceNumber = $(this).data("panel-footersequencenumber");

        for (var i = 0; i < sheetObj.sheetFooters.length; i++) {
            var _footerItemObj = sheetObj.sheetFooters[i];
            if (_footerItemObj.sheetFooter_SequenceNumber == _sheetHeader_SequenceNumber) {
                $(this).val(_footerItemObj.sheetFooter_Text);
            }
        }

    });


}



function EditMode_DisplaySheet_DeliverableSection(sheetObj) {

    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;

    if (sheetObj.deliverableSection == null || sheetObj.deliverableSection == "" || sheetObj.deliverableSection == undefined) {
        return false;
    }

    var _deliverableSection = sheetObj.deliverableSection;
    var _sectionGuid = _deliverableSection.sectionGuid;
    var _sectionID = _deliverableSection.sectionID;
    var _sectionTypeID = _deliverableSection.sectionTypeID;
    var _sequenceNumber = _deliverableSection.sequenceNumber;

    var _deliverableTemplate = sheet_Panel_GetDeliverableTemplate(_sheetGuid, _sectionTypeID, _sectionGuid);

    var _panelDeliverableSectionContainerId = _gPanelDeliverableSectionContainerDivIdPrefix + _sheetGuid;

    $("#" + _panelDeliverableSectionContainerId).append(_deliverableTemplate);


    sheet_Panel_DeliverableSectionPanel_RemoveBtnEvent(_sheetGuid);

    sheet_Panel_DeliverableSectionPanel_AddNoteBtnEvent(_sheetGuid);


    // Assign Deliverable Section Name
    var _deliverableSectioNameId = _gDeliverableSectioPanel_SectionNameIdPrefix + _sectionGuid;
    $("#" + _deliverableSectioNameId).val(_deliverableSection.sectionName);


    // Assign Deliverable Section Title
    var _deliverableSectionTitleId = _gDeliverableSectioPanel_SectionTitleIdPrefix + _sectionGuid;
    $("#" + _deliverableSectionTitleId).val(_deliverableSection.sectionTitle);


    // Notes
    var _deliveablePanelAddNoteBtnId = _gDeliverableSectionPanel_AddNoteBtnIdPrefix + _sheetGuid;
    for (var i = 0; i < _deliverableSection.notes.length; i++) {
        $("#" + _deliveablePanelAddNoteBtnId).trigger("click");
    }

    var _gSheetPanelNoteClass = _gDeliverableSectionPanel_SectionNoteInputTxtClassPrefix + _sheetGuid;

    $("." + _gSheetPanelNoteClass).each(function (noteIndex, notelement) {

        // var _header_Text = $(this).val();
        var _note_SequenceNumber = $(this).data("notesequencenumber");

        for (var i = 0; i < _deliverableSection.notes.length; i++) {
            var _noteItemObj = _deliverableSection.notes[i];
            if (_noteItemObj.sequenceNumber == _note_SequenceNumber) {
                $(this).val(_noteItemObj.noteText);
            }
        }

    });



}



function EditMode_DisplaySheet_MilestoneSection(sheetObj) {

    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;

    if (sheetObj.milestoneSection == null || sheetObj.milestoneSection == "" || sheetObj.milestoneSection == undefined) {
        return false;
    }

    var _milestoneSection = sheetObj.milestoneSection;
    var _sectionGuid = _milestoneSection.sectionGuid;
    var _sectionID = _milestoneSection.sectionID;
    var _sectionTypeID = _milestoneSection.sectionTypeID;
    var _sequenceNumber = _milestoneSection.sequenceNumber;

    var _milestoneTemplate = sheet_Panel_GetMilestoneTemplate(_sheetGuid, _sectionTypeID, _sectionGuid);

    var _panelMilestoneSectionContainerId = _gPanelMilestoneSectionContainerDivIdPrefix + _sheetGuid;

    $("#" + _panelMilestoneSectionContainerId).append(_milestoneTemplate);


    sheet_Panel_MilestoneSectionPanel_RemoveBtnEvent(_sheetGuid);

    sheet_Panel_MilestoneSectionPanel_AddNoteBtnEvent(_sheetGuid);


    // Assign Milestone Section Name
    var _milestoneSectioNameId = _gMilestoneSectionPanel_SectionNameIdPrefix + _sectionGuid;
    $("#" + _milestoneSectioNameId).val(_milestoneSection.sectionName);


    // Assign Milestone Section Title
    var _milestoneSectioTitleId = _gMilestoneSectionPanel_SectionTitleIdPrefix + _sectionGuid;
    $("#" + _milestoneSectioTitleId).val(_milestoneSection.sectionTitle);


    // Notes                       
    var _milestonePanelAddNoteBtnId = _gMilestoneSectionPanel_AddNoteBtnIdPrefix + _sheetGuid;
    for (var i = 0; i < _milestoneSection.notes.length; i++) {
        $("#" + _milestonePanelAddNoteBtnId).trigger("click");
    }


    var _gSheetPanelNoteClass = _gMilestoneSectionPanel_SectionNoteInputTxtClassPrefix + _sheetGuid;

    $("." + _gSheetPanelNoteClass).each(function (noteIndex, notelement) {

        // var _header_Text = $(this).val();
        var _note_SequenceNumber = $(this).data("notesequencenumber");

        for (var i = 0; i < _milestoneSection.notes.length; i++) {
            var _noteItemObj = _milestoneSection.notes[i];
            if (_noteItemObj.sequenceNumber == _note_SequenceNumber) {
                $(this).val(_noteItemObj.noteText);
            }
        }

    });


}



function EditMode_DisplaySheet_KeyPerIndicatorSection(sheetObj) {

    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;

    if (sheetObj.keyPerIndicatorSection == null || sheetObj.keyPerIndicatorSection == "" || sheetObj.keyPerIndicatorSection == undefined) {
        return false;
    }

    var _keyPerIndicatorSection = sheetObj.keyPerIndicatorSection;
    var _sectionGuid = _keyPerIndicatorSection.sectionGuid;
    var _sectionID = _keyPerIndicatorSection.sectionID;
    var _sectionTypeID = _keyPerIndicatorSection.sectionTypeID;
    var _sequenceNumber = _keyPerIndicatorSection.sequenceNumber;

    var _keyPerIndicatorTempalte = sheet_Panel_GetKeyPerIndicatorTemplate(_sheetGuid, _sectionTypeID, _sectionGuid);

    var _panelKeyPerIndicatorSectionContainerId = _gPanelKeyPerIndicatorSectionContainerDivIdPrefix + _sheetGuid;

    $("#" + _panelKeyPerIndicatorSectionContainerId).append(_keyPerIndicatorTempalte);


    sheet_Panel_KeyPerIndicatorSectionPanel_RemoveBtnEvent(_sheetGuid);

    sheet_Panel_KeyPerIndicatorSectionPanel_AddNoteBtnEvent(_sheetGuid);


    // Assign KeyPerIndicator Section Name
    var _keyPerIndicatorSectioNameId = _gKeyPerIndicatorSectionPanel_SectionNameIdPrefix + _sectionGuid;
    $("#" + _keyPerIndicatorSectioNameId).val(_keyPerIndicatorSection.sectionName);


    // Assign KeyPerIndicator Section Title
    var _keyPerIndicatorSectioTitleId = _gKeyPerIndicatorSectionPanel_SectionTitleIdPrefix + _sectionGuid;
    $("#" + _keyPerIndicatorSectioTitleId).val(_keyPerIndicatorSection.sectionTitle);


    // Notes
    var _keyPerIndicatorPanelAddNoteBtnId = _gKeyPerIndicatorSectionPanel_AddNoteBtnIdPrefix + _sheetGuid;
    for (var i = 0; i < _keyPerIndicatorSection.notes.length; i++) {
        $("#" + _keyPerIndicatorPanelAddNoteBtnId).trigger("click");
    }


    var _gSheetPanelNoteClass = _gKeyPerIndicatorSectionPanel_SectionNoteInputTxtClassPrefix + _sheetGuid;

    $("." + _gSheetPanelNoteClass).each(function (noteIndex, notelement) {

        // var _header_Text = $(this).val();
        var _note_SequenceNumber = $(this).data("notesequencenumber");

        for (var i = 0; i < _keyPerIndicatorSection.notes.length; i++) {
            var _noteItemObj = _keyPerIndicatorSection.notes[i];
            if (_noteItemObj.sequenceNumber == _note_SequenceNumber) {
                $(this).val(_noteItemObj.noteText);
            }
        }

    });


}



function EditMode_DisplaySheet_KpiSection(sheetObj) {

    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;

    if (sheetObj.kpiSection == null || sheetObj.kpiSection == "" || sheetObj.kpiSection == undefined) {
        return false;
    }

    var _kpiSection = sheetObj.kpiSection;
    var _sectionGuid = _kpiSection.sectionGuid;
    var _sectionID = _kpiSection.sectionID;
    var _sectionTypeID = _kpiSection.sectionTypeID;
    var _sequenceNumber = _kpiSection.sequenceNumber;

    var _kpiTempalte = sheet_Panel_GetKpiTemplate(_sheetGuid, _sectionTypeID, _sectionGuid);

    var _panelKpiSectionContainerId = _gPanelKpiSectionContainerDivIdPrefix + _sheetGuid;

    $("#" + _panelKpiSectionContainerId).append(_kpiTempalte);


    sheet_Panel_KpiSectionPanel_RemoveBtnEvent(_sheetGuid);

    sheet_Panel_KpiSectionPanel_AddNoteBtnEvent(_sheetGuid);


    // Assign kpi Section Name
    var _kpiSectioNameId = _gKpiSectionPanel_SectionNameIdPrefix + _sectionGuid;
    $("#" + _kpiSectioNameId).val(_kpiSection.sectionName);


    // Assign kpi Section Title
    var _kpiSectioTitleId = _gKpiSectionPanel_SectionTitleIdPrefix + _sectionGuid;
    $("#" + _kpiSectioTitleId).val(_kpiSection.sectionTitle);


    // Notes
    var _kpiPanelAddNoteBtnId = _gKpiSectionPanel_AddNoteBtnIdPrefix + _sheetGuid;
    for (var i = 0; i < _kpiSection.notes.length; i++) {
        $("#" + _kpiPanelAddNoteBtnId).trigger("click");
    }


    var _gSheetPanelNoteClass = _gKpiSectionPanel_SectionNoteInputTxtClassPrefix + _sheetGuid;

    $("." + _gSheetPanelNoteClass).each(function (noteIndex, notelement) {

        // var _header_Text = $(this).val();
        var _note_SequenceNumber = $(this).data("notesequencenumber");

        for (var i = 0; i < _kpiSection.notes.length; i++) {
            var _noteItemObj = _kpiSection.notes[i];
            if (_noteItemObj.sequenceNumber == _note_SequenceNumber) {
                $(this).val(_noteItemObj.noteText);
            }
        }

    });


}









function EditMode_DisplaySheet_AdHocSections(sheetObj) {

    for (var i = 0; i < sheetObj.adHocSections.length; i++) {
        var _adHocSection = sheetObj.adHocSections[i];
        if (_adHocSection != null && _adHocSection != "" && _adHocSection != undefined) {
            EditMode_DisplaySheet_AdHocSection(sheetObj, _adHocSection);
        }
    }
}



function EditMode_DisplaySheet_AdHocSection(sheetObj, adHocSection) {

    var _sheetGuid = sheetObj.sheetGuid;
    var _sheetId = sheetObj.sheetID;
    var _sectionTypeId = adHocSection.sectionTypeID;
    var _sectionGuid = adHocSection.sectionGuid;


    // var _adTemplate = sheet_Panel_GetAdTemplate(_sheetGuid, _gSectionType_AdHoc, _sectionGuid);
    var _adTemplate = sheet_Panel_GetAdTemplate(_sheetGuid, _sectionTypeId, _sectionGuid);

    // var _panelAdSectionContainerId = "panelAdSectionContainerId_" + _panelId;
    var _panelAdSectionContainerId = _gPanelAdSectionContainerDivIdPrefix + _sheetGuid;

    $("#" + _panelAdSectionContainerId).append(_adTemplate);

    sheet_Panel_AdSectionPanel_RemoveBtnEvent(_sheetGuid);

    sheet_Panel_AdSectionPanel_AddTableRowBtnEvent(_sheetGuid, _sectionGuid);


    // Assign AdHoc SectionName
    var _adSectionNameId = _gAdSectionPanel_SectionNameIdPrefix + _sectionGuid;
    $("#" + _adSectionNameId).val(adHocSection.sectionName);

    // Assign AdHoc SectionTitle
    var _adSectionTitleId = _gAdSectionPanel_SectionTitleIdPrefix + _sectionGuid;
    $("#" + _adSectionTitleId).val(adHocSection.sectionTitle);


    EditMode_DisplaySheet_AdHocSection_TrRows(sheetObj, adHocSection)


}



function EditMode_DisplaySheet_AdHocSection_TrRows(sheetObj, adHocSection) {

    var _sectionGuid = adHocSection.sectionGuid;

    var _addSectionPanelPlusBtnId = _gAdSectionPanel_AddTableRowBtnIdPrefix + _sectionGuid;

    for (var i = 0; i < adHocSection.trRows.length; i++) {
        $("#" + _addSectionPanelPlusBtnId).trigger("click");
    }


    var _tableBodyId = _gAdSectionPanel_TableIdPrefix + _sectionGuid + "_Body";
    var _filterBodyTr = "#" + _tableBodyId + " > tr";
    $(_filterBodyTr).each(function (trIndex, trElement) {

        var _trRowId = $(this).attr("id");
        var _trRowIdPartArray = _trRowId.split('_');
        var _trRowGuid = _trRowIdPartArray[1];

        var _rowSequenceNumber = $(this).data("sequencenumber")

        for (var i = 0; i < adHocSection.trRows.length; i++) {
            var _trObj = adHocSection.trRows[i];
            if (_trObj.rowSequenceNumber == _rowSequenceNumber) {
                var _inputSelect_RowId = "InputSelectRowId_" + _trRowGuid;
                $("#" + _inputSelect_RowId).val(_trObj.rowNumber);

                var _inputSelect_ColId = "InputSelectColId_" + _trRowGuid;
                $("#" + _inputSelect_ColId).val(_trObj.columnNumber);

                var _inputSelect_LengthUnitId = "InputSelectLengthUnitId_" + _trRowGuid;
                $("#" + _inputSelect_LengthUnitId).val(_trObj.lengthUnit);

                var _inputSelect_AlignmentId = "InputSelectAlignmentId_" + _trRowGuid;
                $("#" + _inputSelect_AlignmentId).val(_trObj.alignment);

                var _inputSelect_DataTypeId = "InputSelectDataTypeId_" + _trRowGuid;
                $("#" + _inputSelect_DataTypeId).val(_trObj.dataType);

                var _inputSelect_DataFormatId = "InputSelectDataFormatId_" + _trRowGuid;
                $("#" + _inputSelect_DataFormatId).val(_trObj.dataFormat);

                var _inputTextArea_ValueId = "InputTextAreaValueId_" + _trRowGuid;
                $("#" + _inputTextArea_ValueId).val(_trObj.valueText);

                var _inputSelect_ReadOnlyId = "InputSelectReadOnlyId_" + _trRowGuid;
                $("#" + _inputSelect_ReadOnlyId).val(_trObj.readOnly);


                var _inputText_FormulaId = "InputTextFormulaId_" + _trRowGuid;
                $("#" + _inputText_FormulaId).val(_trObj.formulaText);

                var _inputSelect_SumRequiredId = "InputSelectSumRequiredId_" + _trRowGuid;
                $("#" + _inputSelect_SumRequiredId).val(_trObj.sumRequired);



            }

        }


    });



}

