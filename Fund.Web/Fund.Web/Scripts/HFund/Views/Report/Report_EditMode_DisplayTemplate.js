
// gloable variables
var _gTextAreaMaxLength = 2000;
var _gTextBoxMaxLength = 250;

var _gCurrentFundingDetailId = "";
var _gCurrentUserId = "";
var _gFiscalYear = "";
var _gCurrentReportTemplateId = "";

var _gSectionType_Deliverable = "";
var _gSectionType_Milestone = "";
var _gSectionType_KeyPerformanceIndicator = "";
var _gSectionType_KPI = "";
var _gSectionType_AdHoc = "";

var _gDataType_Text = "";
var _gDataType_Numeric = "";
var _gDataType_Decimal = "";
var _gDataType_Date = "";

var _gReportFrequency_OneTime = "";
var _gReportFrequency_Monthly = "";
var _gReportFrequency_Quarterly = "";
var _gReportFrequency_Annually = "";

var _gDataFormat_Non = 0;
var _gDataFormat_Date = 1;
var _gDataFormat_Currency = 2;
var _gDataFormat_Percentage = 3;

var _gSheetHeaderDivPrefix = "sheetHeaderDiv_";
var _gSheetHeaderDivOlPrefix = "sheetHeaderDivOl_";
var _gSheetFooterDivPrefix = "sheetFooterDiv_";
var _gSheetFooterDivOlPrefix = "sheetFooterDivOl_";

var _gSheetDeliverableSectionDivPrefix = "sheetDeliverableSectionDiv_";
var _gSheetMilestoneSectionDivPrefix = "sheetMilestoneSectionDiv_";
var _gSheetKeyPerformanceIndicatorSectionDivPrefix = "sheetKeyPerIndicatorSectionDiv_";
var _gSheetKPISectionDivPrefix = "sheetKPISectionDiv_";
var _gSheetAdHocSectionDivPreifx = "sheetAdHocSectionDiv_";

// SectionType = 1
var _gDeliverableTableIdPrefix     = "deliverableSectionTableId_";
var _gDeliverableTableBodyIdPrefix = "deliverableSectionTableBodyId_"
var _gDeliverableTable_Col1Deliverable_SpanIdPrefix = "deliverableTableCol1Deliverable_";
var _gDeliverableTable_Col2HspComment_TextAreaIdPrefix = "deliverableTableCol2HspComment_";
var _gDeliverableTable_Col2HspCommentClassPrefix = "deliverableTableCol2HspCommentClass_";

// SectionType = 2
var _gMilestoneTableIdPrefix = "milestoneSectionTableId_";
var _gMilestoneTableBodyIdPrefix = "milestoneSectionTableBodyId_"
var _gMilestoneTable_Col1Milestone_SpanIdPrefix = "milestoneTableCol1Milestone_";
var _gMilestoneTable_Col2StartDate_SpanIdPrefix = "milestoneTableCol2StartDate_";
var _gMilestoneTable_Col3EstimatedPercentComplete_TextBoxIdPrefix = "milestoneTableCol3EstimatedPercentComplete_";
var _gMilestoneTable_Col3EstimatedPercentCompleteClass = "milestoneTableCol3EstimatedPercentCompleteClass_";
var _gMilestoneTable_Col4ActualCompletionDate_TextBoxIdPrefix = "milestoneTableCol4ActualCompletionDate_";
var _gMilestoneTable_Col4ActualCompletionDateClass = "milestoneTableCol4ActualCompletionDateClass_";
var _gMilestoneTable_Col5Comments_TextAreaIdPrefix = "milestoneTableCol5Comments_";
var _gMilestoneTable_Col5CommentsClassPrefix = "milestoneTableCol5CommentsClass_";


// SectionType = 3
var _gKeyPerIndicatorTableIdPrefix = "keyPerIndicatorSectionTableId_";
var _gKeyPerIndicatorTableBodyIdPrefix = "keyPerIndicatorSectionTableBodyId_"
var _gKeyPerIndicatorTable_Col1PerformanceIndicator_SpanIdPrefix = "keyPerIndicatorTableCol1PerformanceIndicator_";
var _gKeyPerIndicatorTable_Col2BaseLine_SpanIdPrefix = "keyPerIndicatorTableCol2BaseLine_";
var _gKeyPerIndicatorTable_Col3ProgessSoFar_TextBoxIdPrefix = "keyPerIndicatorTableCol3ProgressSoFar_";
var _gKeyPerIndicatorTable_Col3ProgessSoFarClassPrefix = "keyPerIndicatorTableCol3ProgressSoFarClass_";
var _gKeyPerIndicatorTable_Col4Target_SpanIdPrefix = "keyPerIndicatorTableCol4Target_";
var _gKeyPerIndicatorTable_Col5Comments_TextAreaIdPrefix = "keyPerIndicatorTableCol5Comments_";
var _gKeyPerIndicatorTable_Col5CommentsClassPrefix = "keyPerIndicatorTableCol5CommentsClass_";


// SectionType = 4 (saaSectorID == 1 or 3) Display = Hospital
var _gKPIHospitalTableIdPrefix     = "kpiHospitalSectionTableId_";
var _gKPIHospitalTableBodyIdPrefix = "kpiHospitalSectionTableBodyId_"
var _gKPIHospitalTable_Col1Program_SpanIdPrefix = "kpiHospitalTableCol1Program_";
var _gkPIHospitalTable_Col2Category_SpanIdPrefix = "kpiHospitalTableCol2Category_";
var _gKPIHospitalTable_Col3SubCategory_SpanIdPrefix = "kpiHospitalCol3SubCategory_";
var _gKPIHospitalTable_Col4UnitOfMeasure_SpanIdPrefix = "kpiHospitalTableCol4UnitOfMeasure_";
var _gKPIHospitalTable_Col5BeginningVolume_SpanIdPrefix = "kpiHospitalTableCol5BeginningVolume_";
var _gKPIHospitalTable_Col6InYear_SpanIdPrefix = "kpiHospitalTableCol6InYear_";
var _gKPIHospitalTable_Col7ClosingBalance_SpanIdPrefix = "kpiHospitalTableCol7ClosingBalance_";
var _gKPIHospitalTable_Col8ActualVolume_TextBoxIdPrefix = "kpiHospitalTableCol8ActualVolume_";
var _gKPIHospitalTable_Col8ActualVolumeClassPrefix = "kpiHospitalTableCol8ActualVolumeClass_";

// SectionType = 4 (saaSectorID == 2) Display = NonHospital
var _gKPINonHospitalTableIdPrefix = "kpiNonHospitalSectionTableId_";
var _gKPINonHospitalTableBodyIdPrefix = "kpiNonHospitalSectionTableBodyId_"
var _gKPINonHospitalTable_Col1TPBE_SpanIdPrefix = "kpiNonHospitalTableCol1TPBE_";
var _gkPINonHospitalTable_Col2FunctionalCenter_SpanIdPrefix = "kpiNonHospitalTableCol2FunctionalCenter_";
var _gKPINonHospitalTable_Col3Activity_SpanIdPrefix = "kpiNonHospitalCol3Activity_";
var _gKPINonHospitalTable_Col4BeginningVolume_SpanIdPrefix = "kpiNonHospitalTableCol4BeginningVolume_";
var _gKPINonHospitalTable_Col5InYear_SpanIdPrefix = "kpiNonHospitalTableCol5InYear_";
var _gKPINonHospitalTable_Col6ClosingBalance_SpanIdPrefix = "kpiNonHospitalTableCol6ClosingBalance_";
var _gKPINonHospitalTable_Col7ActualVolume_TextBoxIdPrefix = "kpiNonHospitalTableCol7ActualVolume_";
var _gKPINonHospitalTable_Col7ActualVolumeClassPrefix = "kpiNonHospitalTableCol7ActualVolumeClass_";

// SectionType = 5 (adHoc)
var _gAdHoc_TableIdPrefix = "adHocTableId_";
var _gAdHoc_TableCalculatorIdPrefix = "adHocTableCalculatorIdPrefix_";
var _gAdHoc_TableBodyIdPrefix = "adHocTableBodyId_";
var _gAdHoc_TdIdPrefix = "adHocTd_";
var _gAdHoc_TdSpanIdPrefix = "adHocTdSpan_";
var _gAdHoc_IdTextBoxIdPrefix = "adHocTdTextBox_";
var _gAdHoc_TableCalculatorClassPrefix = "adHocTableCalculatorClassPrefix_";


var _gReportTemplateObj = {};


class FLTReportDeliverableUpdateVM {
    FLTReportDeliverableID;
    ActualDate;
    Explanation;
    ExpectedCompletionDate;
    ActualTargetCompletionDate;
    ActualDeliverableCost;
    PercentCompleted;
}


class FLTReportMilestoneUpdateVM {
    FLTReportMilestoneID;
    ActualDate;
    ActualStartDate;
    EstimatedCompletion;
    Explanation;
}


class FLTReportIndicatorUpdateVM {
    FLTReportIndicatorID;
    Result;
    ForecastAmount;
    PercentCompleted;
    Progress;
    Explanation;
}

class FLTReportRevenueLineUpdateVM {
    FLTReportRevenueLineID;
    ReportVolume;
}

class FLTReportCellUpdateVM {
    FLTReportCellID;
    DataType;
    Format;
    NumericValue;
    DecimalValue;
    TextValue;
    DateValue;
    DateValueStr;
}

class FLTReportSectorUpdateVM {
    FLTReportSectionID;
    SectionTypeID;
    FLTReportDeliverables = [];
    FLTReportMilestones = [];
    FLTReportIndicators = [];
    FLTReportRevenueLines = [];
    FLTReportCells = [];
}


var FLTReportSheetUpdateVM = {
    FLTReportSheetID: 0,
    FLTReportSections:[], 
}

class TableTdPosition {
    RowNo;
    ColNo;
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

    $("#OneTimeDateColumn").hide();

    ajax_ReportApi_GetReportTemplateInstance_ByFundingDetailId(_gCurrentFundingDetailId);


});






function RegisterAdHocCellTableCalculatorClickEvent() {

    $(".adHocTableCalculatorClass").click(function (e) {
        e.preventDefault();
        console.log("RegisterAdHocCellTableCalculatorClickEvent() ");
        var _calculatorId = $(this).attr("id");
        AdHocCellTableCalculatorClickEvent_Perform(_calculatorId);
    });

}

function AdHocCellTableCalculatorClickEvent_Perform(calculatorId) {

    console.log("AdHocCellTableCalculatorClickEvent_Perform table caculator id = " + calculatorId);

    // find out table body id
    var _calculatorIdArr = calculatorId.split('_');
    var _tbBodyId = _gAdHoc_TableBodyIdPrefix + _calculatorIdArr[1] + "_" + _calculatorIdArr[2];

    console.log("AdHocCellTableCalculatorClickEvent_Perform table body id = " + _tbBodyId);

    Calculator_Step1_FindFormulaFields(_tbBodyId);
}


function Calculator_Step1_FindFormulaFields(tableBodyId)
{

    $("#" + tableBodyId + " > tr").each(function (trIndex, elementTR) {

        $(elementTR).find('td').each(function (tdIndex, elementTD) {
            var _tdId = $(elementTD).attr("id");
            var _tdHasElement = $(elementTD).data("haselement");
            var _formula = $(elementTD).data("formula");
            var _sunrequired = $(elementTD).data("sumrequired");

            if (_tdHasElement == "1" )
            {
                if (_formula != null && _formula != "")
                {
                    console.warn("td =" + _tdId + " formula =" + _formula + " sumrequired=" + _sunrequired);
                    Calculator_Step2_ProcessFormula(tableBodyId, _tdId, _formula);
                }
            }

        });

    });

}


function Calculator_Step2_ProcessFormula(tableBodyId, formulaTdId, formula)
{

    var _tableIdPositions = [];

    // Sum(R2,C2:C5)
    // Sum(C3,R2:R3)

    var _isHorizontal = 0;
    var _hRowNumber = 0;
    var _isVertical = 0;
    var _vColNumber = 0;
    var _cellBegin = 0;
    var _cellEnd = 0;


    var tempFormula = formula.toUpperCase().trim();
    var tempFormulaArr = tempFormula.split(',');

    // find out  Horizontal or Vertical, By Sum(R), Sum(C)
    var _HV = tempFormulaArr[0].trim().substring(4, 5);
    var _HV_Number = tempFormulaArr[0].trim().substring(5);

    console.log("HV = " + _HV);
    console.log("HV_Number = " + _HV_Number);

    if (_HV == "R") {
        _isHorizontal = 1;
        _isVertical = 0;
        _hRowNumber = parseInt(_HV_Number);

    } else {
        _isHorizontal = 0;
        _isVertical = 1;
        _vColNumber = parseInt(_HV_Number);
    }

    // C2:C5)
    var tempFormulaPartTwo = tempFormulaArr[1].replace(')', '').trim();
    console.log(" tempFormulaPartTwo : " + tempFormulaPartTwo);

    var tempFormulaPartTwoArr = tempFormulaPartTwo.split(":");
    var tempCellBgin = tempFormulaPartTwoArr[0].trim().substring(1);
    var tempCellEnd =  tempFormulaPartTwoArr[1].trim().substring(1);

    console.log("Cell Begin :" + tempCellBgin + " Cell End :" + tempCellEnd);

    _cellBegin = parseInt(tempCellBgin);
    _cellEnd = parseInt(tempCellEnd);

    if (_isHorizontal == 1) {

        for (var h = _cellBegin; h <= _cellEnd; h++) {
            var newTdPosition = new TableTdPosition();
            newTdPosition.RowNo = _hRowNumber;
            newTdPosition.ColNo = h;
            _tableIdPositions.push(newTdPosition);
        }
    }
    else
    {
        for (var v = _cellBegin; v <= _cellEnd; v++) {
            var newTdPosition = new TableTdPosition();
            newTdPosition.RowNo = v;
            newTdPosition.ColNo = _vColNumber;
            _tableIdPositions.push(newTdPosition);
        }
    }

    console.log(_tableIdPositions);

    var retTotal = Calculator_Step3_SumCells(tableBodyId, formulaTdId, tempFormula, _tableIdPositions);
    console.log("retTotal = " + retTotal);


    var _cellElementId = null;
    var _cellReadOnly = $("#" + formulaTdId).data("readonly");
    var _cellformat = $("#" + formulaTdId).data("format");

    // sample tableTdId == adHocTd_326_596_2_3
    //                         [0]_[1]_[2]_[3]_[4]

    var formulaTdIdArr = formulaTdId.split('_');

    if (_cellReadOnly == true) {
        // span
        _cellElementId = _gAdHoc_TdSpanIdPrefix + formulaTdIdArr[1] + '_' + formulaTdIdArr[2] + '_' + formulaTdIdArr[3] + '_' + formulaTdIdArr[4];
      

    } else {
        // text box
        _cellElementId = _gAdHoc_IdTextBoxIdPrefix + formulaTdIdArr[1] + '_' + formulaTdIdArr[2] + '_' + formulaTdIdArr[3] + '_' + formulaTdIdArr[4];
    }



    if (retTotal == null) {
        // show empty
        if (_cellReadOnly == true) {

            if (_cellformat == _gDataFormat_Currency) {
              //  var tempDecimalCurrency = Report_ConvertDecimalToCurrencyFormat(retTotal);
                $("#" + _cellElementId).text('');
            } else {
                $("#" + _cellElementId).text('');
            }

        } else {
            if (_cellformat == _gDataFormat_Currency) {
               // var tempDecimalCurrency = Report_ConvertDecimalToCurrencyFormat(retTotal);
                $("#" + _cellElementId).val('');
            } else {
                $("#" + _cellElementId).val('');
            }

        }

    } else {

        if (_cellReadOnly == true) {

            if (_cellformat == _gDataFormat_Currency) {
                var tempDecimalCurrency = Report_ConvertDecimalToCurrencyFormat(retTotal);
                $("#" + _cellElementId).text('$' + tempDecimalCurrency);
            } else {
                $("#" + _cellElementId).text(retTotal);
            }

        } else {
            if (_cellformat == _gDataFormat_Currency) {
                var tempDecimalCurrency = Report_ConvertDecimalToCurrencyFormat(retTotal);
                $("#" + _cellElementId).val(tempDecimalCurrency);
            } else {
                $("#" + _cellElementId).val(retTotal);
            }
           
        }
    }


}



function Calculator_Step3_SumCells(tableBodyId, formulaTdId, formula, tdPositions) {

    var retToal = null;

    var sumTotal = 0;

    var sumCounter = 0;

    for (var i = 0; i < tdPositions.length; i++) {

        var lineItem = tdPositions[i];

        $("#" + tableBodyId + " > tr").each(function (trIndex, elementTR) {

            $(elementTR).find('td').each(function (tdIndex, elementTD) {
                var _tdId = $(elementTD).attr("id");
                var _tdHasElement = $(elementTD).data("haselement");
                var _rowNo = $(elementTD).data("rowno");
                var _colNo = $(elementTD).data("colno");
                if (_tdHasElement == "1" && lineItem.RowNo == _rowNo && lineItem.ColNo == _colNo ) {

                    var cellValue = Calculator_Step4_GetSingleCellValue(_tdId, _rowNo, _colNo);

                    console.log("Calculator_Step4_GetSingleCellValue return cell value=" + cellValue);

                    if (cellValue != null && cellValue != "") {
                        sumTotal = parseFloat(sumTotal) + parseFloat(cellValue);
                        sumCounter = parseInt(sumCounter) + parseInt(1);
                        console.log("Sum Cell sumTotal=" + sumTotal + "  sumCounter=" + sumCounter);
                    } else if (cellValue == "0" || cellValue == 0) {
                        // may not be a bug "0" case different
                        sumTotal = parseFloat(sumTotal) + parseFloat(cellValue);
                        sumCounter = parseInt(sumCounter) + parseInt(1);
                        console.log("Zero entered Sum Cell sumTotal=" + sumTotal + "  sumCounter=" + sumCounter);
                    }
                }
               
            });

        });

    }

    if (sumCounter > 0) {
        retToal = sumTotal;
    }

    console.log("Calculator_Step3_SumCells sumTotal=" + sumTotal + "   sumCounter= " + sumCounter + "  retTotal=" + retToal);

    return retToal;
}



function Calculator_Step4_GetSingleCellValue(tableTdId, rowNo, colNo)
{
    // sample tableTdId == adHocTd_326_596_2_3
    //                         [0]_[1]_[2]_[3]_[4]

    console.log("Calculator_Step4_GetSingleCellValue() table td id = " + tableTdId);
    var cellValue = null;
    var elementId = null;
    var _cellReadOnly = $("#" + tableTdId).data("readonly");

    var tableTdIdArr = tableTdId.split('_');

    if (_cellReadOnly == true) {
        // span
        elementId = _gAdHoc_TdSpanIdPrefix + tableTdIdArr[1] + '_' + tableTdIdArr[2] + '_' + tableTdIdArr[3] + '_' + tableTdIdArr[4];
        var tempCelValue = $("#" + elementId).text();
        if (tempCelValue != null && tempCelValue != "") {
            var tempDecimal = tempCelValue.replace(/,/g, '');
            tempDecimal = tempDecimal.replace('$', '');
            cellValue = parseFloat(tempDecimal);
            console.log("element Id " + elementId);
            console.log("element Id value = " + cellValue);
        }

    } else {
        // text box
        elementId = _gAdHoc_IdTextBoxIdPrefix  + tableTdIdArr[1] + '_' + tableTdIdArr[2] + '_' + tableTdIdArr[3] + '_' + tableTdIdArr[4];
        var tempCelValue = $("#" + elementId).val();
        if (tempCelValue != null && tempCelValue != "") {
            var tempDecimal = tempCelValue.replace(/,/g, '');
            tempDecimal = tempDecimal.replace('$', '');
            cellValue = parseFloat(tempDecimal);
            console.log("element Id " + elementId);
            console.log("element Id value = " + cellValue);
        }

    }


    return cellValue;
}








function RegisterBtnTabSaveEvent() {


    $(".btnTabSave").click(function (e) {
        e.preventDefault();
        var _btnSaveId = $(this).attr("id");
        var _btnSaveIdArr = _btnSaveId.split('_');
        var _sheetID = _btnSaveIdArr[1];
        btnTabSave_Event(e, _sheetID);
    });

}

function btnTabSave_Event(event, curTabSheetID)
{
    console.log("btnTabSave_Event(sheetID ): " + curTabSheetID);

    // auto calculate SUM in AdHoc
    var adHocCaculatorClass = _gAdHoc_TableCalculatorClassPrefix + curTabSheetID;

    $("." + adHocCaculatorClass).each(function (calIndex, calElement) {
        var _calId = $(calElement).attr("id");
        // re-call it again
        AdHocCellTableCalculatorClickEvent_Perform(_calId);
    });

   // return;

    var _curTabSheet = null;

    for (var i = 0; i < _gReportTemplateObj.fltReportSheets.length; i++)
    {
        var _sheetItemObj = _gReportTemplateObj.fltReportSheets[i];
        if (_sheetItemObj.fltReportSheetID == curTabSheetID) {
            _curTabSheet = _sheetItemObj;
        }
    }

    if (_curTabSheet == null) {
        alert("something went wrong, saving with issue ?");
        return;
    }

    FLTReportSheetUpdateVM.FLTReportSheetID = _curTabSheet.fltReportSheetID;

 
    var _isAllValid = 1;
    var _allErrorMessages = [];
    var _FLTReportSections = [];

    if (_curTabSheet.fltReportSections.length > 0) {
        for (var i = 0; i < _curTabSheet.fltReportSections.length; i++) {

            var _sectionObj = _curTabSheet.fltReportSections[i];

            if (_sectionObj != null && _sectionObj != undefined && _sectionObj != "") {

                if (_sectionObj.sectionTypeID == _gSectionType_Deliverable) {

                    var _deliverableSectionReturnData = btnTabSave_GetDeliverableInput(_curTabSheet, _sectionObj);
                    if (_deliverableSectionReturnData.isValid == "0") {
                        _isAllValid = 0;
                        for (var errCounter = 0; errCounter < _deliverableSectionReturnData.errorMessages.length; errCounter++) {
                            var _errorMessage = _deliverableSectionReturnData.errorMessages[errCounter];
                            _allErrorMessages.push(_errorMessage);
                        }
                    } else {

                        let _deliverableSector = new FLTReportSectorUpdateVM();
                        _deliverableSector.FLTReportSectionID = _sectionObj.fltReportSectionID;
                        _deliverableSector.SectionTypeID = _sectionObj.sectionTypeID;
                        _deliverableSector.FLTReportDeliverables = _deliverableSectionReturnData.lineItems;

                        _FLTReportSections.push(_deliverableSector);
                    }

                } else if (_sectionObj.sectionTypeID == _gSectionType_Milestone) {

                    var _milestoneSectionReturnData = btnTabSave_GetMilestoneInput(_curTabSheet, _sectionObj);

                    if (_milestoneSectionReturnData.isValid == "0") {
                        _isAllValid = 0;
                        for (var errCounter = 0; errCounter < _milestoneSectionReturnData.errorMessages.length; errCounter++) {
                            var _errorMessage = _milestoneSectionReturnData.errorMessages[errCounter];
                            _allErrorMessages.push(_errorMessage);
                        }
                    } else {

                        let _milestoneSector = new FLTReportSectorUpdateVM();
                        _milestoneSector.FLTReportSectionID = _sectionObj.fltReportSectionID;
                        _milestoneSector.SectionTypeID = _sectionObj.sectionTypeID;
                        _milestoneSector.FLTReportMilestones = _milestoneSectionReturnData.lineItems;

                        _FLTReportSections.push(_milestoneSector);
                    }


                } else if (_sectionObj.sectionTypeID == _gSectionType_KeyPerformanceIndicator) {

                    var _indicatorReturnData = btnTabSave_GetKeyPerformanceIndicatorInput(_curTabSheet, _sectionObj);
                    if (_indicatorReturnData.isValid == "0") {
                        _isAllValid = 0;
                        for (var errCounter = 0; errCounter < _indicatorReturnData.errorMessages.length; errCounter++) {
                            var _errorMessage = _indicatorReturnData.errorMessages[errCounter];
                            _allErrorMessages.push(_errorMessage);
                        }
                    } else {

                        let _indicatorSector = new FLTReportSectorUpdateVM();
                        _indicatorSector.FLTReportSectionID = _sectionObj.fltReportSectionID;
                        _indicatorSector.SectionTypeID = _sectionObj.sectionTypeID;
                        _indicatorSector.FLTReportIndicators = _indicatorReturnData.lineItems;

                        _FLTReportSections.push(_indicatorSector);
                    }

                } else if (_sectionObj.sectionTypeID == _gSectionType_KPI) {

                     var _kpiReturnData = btnTabSave_GetKPIInput(_curTabSheet, _sectionObj);
                   // console.log(_kpiReturnData);
                    if (_kpiReturnData.isValid == "0") {
                        _isAllValid = 0;
                        for (var errCounter = 0; errCounter < _kpiReturnData.errorMessages.length; errCounter++) {
                            var _errorMessage = _kpiReturnData.errorMessages[errCounter];
                            _allErrorMessages.push(_errorMessage);
                        }
                    } else {

                         let _kpiSector = new FLTReportSectorUpdateVM();
                        _kpiSector.FLTReportSectionID = _sectionObj.fltReportSectionID;
                        _kpiSector.SectionTypeID = _sectionObj.sectionTypeID;
                        _kpiSector.FLTReportRevenueLines = _kpiReturnData.lineItems;

                        _FLTReportSections.push(_kpiSector);
                    }

                } else if (_sectionObj.sectionTypeID == _gSectionType_AdHoc) {

                  
                    var _adHocReturnData = btnTabSave_GetAdHocInput(_curTabSheet, _sectionObj);
                    console.log("Ad Hoc Section Return Data");
                    console.log(_adHocReturnData);

                    if (_adHocReturnData.isValid == "0") {
                        _isAllValid = 0;
                        for (var errCounter = 0; errCounter < _adHocReturnData.errorMessages.length; errCounter++) {
                            var _errorMessage = _adHocReturnData.errorMessages[errCounter];
                            _allErrorMessages.push(_errorMessage);
                        }
                    } else {

                        let _adHocSector = new FLTReportSectorUpdateVM();
                        _adHocSector.FLTReportSectionID = _sectionObj.fltReportSectionID;
                        _adHocSector.SectionTypeID = _sectionObj.sectionTypeID;
                        _adHocSector.FLTReportCells = _adHocReturnData.lineItems;

                        _FLTReportSections.push(_adHocSector);
                    }




                }
            }

        }

    }

    console.log("exit loop");


    if (_isAllValid == 0) {

        var _liItems = "";
        for (var i = 0; i < _allErrorMessages.length; i++) {
            var _errorMessage = _allErrorMessages[i];
            _liItems += "<li>" + _errorMessage + "</li>";
        }
        var _ol = "<ol>" + _liItems + "</ol>";

        showModalAlert("Saving Validation Errors", _ol);

        return;
    }

    FLTReportSheetUpdateVM.FLTReportSections = _FLTReportSections;

    console.log("Submit Api Before FLTReportSheetUpdateVM Object Below ");

    console.log(FLTReportSheetUpdateVM);


    $.ajax({
        url: '/api/ReportApi/SaveReportTemplateInstance/',
        type: 'POST',
        data: JSON.stringify(FLTReportSheetUpdateVM),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, xhr) {

            if (data.isExecuteSuccess == "1") {
                showModalAlert("Save Sheet ", "Data Saved Sucessfully.");

            } else {
                showModalAlert("Save Sheet ", "Saving Failed, Please close modal window, try again later ...");
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
            showModalAlert("Save Sheet", "Saving Failed, Please close modal window, try again later ...");
        }

    });





}



function btnTabSave_GetDeliverableInput(sheetObj, deliverableSectionObj) {


    var _isValid = 1;
    var _errorMessages = [];
    var _deliverableLineItems = [];

    var tableBodyId = _gDeliverableTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID;

    console.log("btnTabSave_GetDeliverableInput() was called .");
    console.log("tableBodyId = " + tableBodyId);

    $("#" + tableBodyId +  " > tr").each(function (index, element) {

       
        var _fltReportDeliverableId = $(this).data("fltreportdeliverableid");
        var _deliverableId = $(this).data("deliverableid");

        var _col1SpanId = _gDeliverableTable_Col1Deliverable_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID + "_" + index;
        var _col1Value = $("#" + _col1SpanId).text();

        var _col2TextAreaId = _gDeliverableTable_Col2HspComment_TextAreaIdPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID + "_" + index;
        var _col2Value = $("#" + _col2TextAreaId).val();

        if (_col2Value != null && _col2Value != "" && _col2Value.length > 2000) {
            _isValid = 0;
            _errorMessages.push("Deliverable Section, HSP Comment max length is 2000.");
        }

        let _newLineItem = new FLTReportDeliverableUpdateVM();
        _newLineItem.FLTReportDeliverableID = _fltReportDeliverableId;
        _newLineItem.Explanation = _col2Value;

        _deliverableLineItems.push(_newLineItem);

    });


    return { isValid: _isValid, errorMessages: _errorMessages, lineItems: _deliverableLineItems  };

}



function btnTabSave_GetMilestoneInput(sheetObj, milestoneSectionObj) {


    var _isValid = 1;
    var _errorMessages = [];
    var _milestoneLineItems = [];

    var tableBodyId = _gMilestoneTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID;

    console.log("btnTabSave_GetMilestoneInput() was called .");
    console.log("tableBodyId = " + tableBodyId);

    $("#" + tableBodyId + " > tr").each(function (index, element) {


        var _fltrReportMilestoneId = $(this).data("fltreportmilestoneid");
    
        var _col1SpanId = _gMilestoneTable_Col1Milestone_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + index;
        var _col1Value = $("#" + _col1SpanId).text();

        var _col2SpanId = _gMilestoneTable_Col2StartDate_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + index;
        var _col2Value = $("#" + _col2SpanId).text();

        var _col3TextBoxId = _gMilestoneTable_Col3EstimatedPercentComplete_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + index;
        var _col3Value = $("#" + _col3TextBoxId).val();

        var _col4TextBoxId = _gMilestoneTable_Col4ActualCompletionDate_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + index;
        var _col4Value = $("#" + _col4TextBoxId).val();

        var _col5TextBoxId = _gMilestoneTable_Col5Comments_TextAreaIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + index;
        var _col5Value = $("#" + _col5TextBoxId).val();


        if (_col3Value != null && _col3Value != "") {
            var _estimatedPercentCompleteValid = Report_DecimalValidation(_col3Value);
            console.log("Milestone section  percent complete isvalid : " + _estimatedPercentCompleteValid);
            if (_estimatedPercentCompleteValid == false) {
                _isValid = 0;
                _errorMessages.push("Milestone Section, Estimated % Complete input is invalid, ex 45.21");
            }
        }

        if (_col4Value != null && _col4Value != "") {
            var _actualCompletionDateValid = Report_DateFormatValidation(_col4Value);
            console.log("Milestone section,  Actual completion Date isvalid : " + _actualCompletionDateValid);
            if (_actualCompletionDateValid == false) {
                _isValid = 0;
                _errorMessages.push("Milestone Section, Actual completion Date input is invalid, ex 07/11/2022");
            }
        }

        if (_col5Value != null && _col5Value != "" && _col5Value.length > _gTextAreaMaxLength) {
            _isValid = 0;
            _errorMessages.push("Milestone Section, Comment max length is " + _gTextAreaMaxLength + ".");
        }


        let _newLineItem = new FLTReportMilestoneUpdateVM();
        _newLineItem.FLTReportMilestoneID = _fltrReportMilestoneId;
        _newLineItem.EstimatedCompletion = _col3Value
        _newLineItem.ActualCompletionDateStr = _col4Value
        _newLineItem.Explanation = _col5Value;

        _milestoneLineItems.push(_newLineItem);

    });


    return { isValid: _isValid, errorMessages: _errorMessages, lineItems: _milestoneLineItems };

}




function btnTabSave_GetKeyPerformanceIndicatorInput(sheetObj, indicatorSectionObj) {


    var _isValid = 1;
    var _errorMessages = [];
    var _indicatorLineItems = [];

    var tableBodyId = _gKeyPerIndicatorTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + indicatorSectionObj.fltReportSectionID;

    console.log("btnTabSave_GetKeyPerformanceIndicatorInput() was called . ");
    console.log("tableBodyId = " + tableBodyId);

    $("#" + tableBodyId + " > tr").each(function (index, element) {


        var _indicatorId = $(this).data("indicatorid");

        var _col1SpanId = _gKeyPerIndicatorTable_Col1PerformanceIndicator_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + indicatorSectionObj.fltReportSectionID + "_" + index;
        var _col1Value = $("#" + _col1SpanId).text();

        var _col2SpanId = _gKeyPerIndicatorTable_Col2BaseLine_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + indicatorSectionObj.fltReportSectionID + "_" + index;
        var _col2Value = $("#" + _col2SpanId).text();

        var _col3TextBoxId = _gKeyPerIndicatorTable_Col3ProgessSoFar_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + indicatorSectionObj.fltReportSectionID + "_" + index;
        var _col3Value = $("#" + _col3TextBoxId).val();

        var _col4TextBoxId = _gKeyPerIndicatorTable_Col4Target_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + indicatorSectionObj.fltReportSectionID + "_" + index;
        var _col4Value = $("#" + _col4TextBoxId).val();

        var _col5TextBoxId = _gKeyPerIndicatorTable_Col5Comments_TextAreaIdPrefix + sheetObj.fltReportSheetID + "_" + indicatorSectionObj.fltReportSectionID + "_" + index;
        var _col5Value = $("#" + _col5TextBoxId).val();


        if (_col3Value != null && _col3Value != "" && _col3Value.length > _gTextBoxMaxLength) {
            _isValid = 0;
            _errorMessages.push("Key Performance Indicator Section, Progress so far max length is " + _gTextBoxMaxLength  + ".");
        }


        if (_col5Value != null && _col5Value != "" && _col5Value.length > _gTextAreaMaxLength) {
            _isValid = 0;
            _errorMessages.push("Key Performance Indicator Section, Comment max length is " + _gTextAreaMaxLength + ".");
        }


        let _newLineItem = new FLTReportIndicatorUpdateVM();
        _newLineItem.FLTReportIndicatorID = _indicatorId;
        _newLineItem.Progress = _col3Value;
        _newLineItem.Explanation = _col5Value;
        _indicatorLineItems.push(_newLineItem);
    });


    return { isValid: _isValid, errorMessages: _errorMessages, lineItems: _indicatorLineItems };

}




function btnTabSave_GetKPIInput(sheetObj, kpiSectionObj) {


    var _isValid = 1;
    var _errorMessages = [];
    var _kpiLineItems = [];
    var _saaSectorID = 0;
    console.log("btnTabSave_GetKPIInput() was called .");

    for (var i = 0; i < kpiSectionObj.fltReportRevenueLines.length; i++) {
        var _revenueLineObj = kpiSectionObj.fltReportRevenueLines[i];
        _saaSectorID = _revenueLineObj.fundingRevenueLineBalance.saaSectorID;
    }

    console.log("btnTabSave_GetKPIInput() saaSectorID = " + _saaSectorID);

    if (_saaSectorID == "1" || _saaSectorID == "3")
    {
        var tableBodyId = _gKPIHospitalTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;
       
        console.log("tableBodyId = " + tableBodyId);

        $("#" + tableBodyId + " > tr").each(function (index, element) {

            var _revenueLineId = $(this).data("revenuelineid");

            var _col1SpanId = _gKPIHospitalTable_Col1Program_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col1Value = $("#" + _col1SpanId).text();

            var _col2SpanId = _gkPIHospitalTable_Col2Category_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col2Value = $("#" + _col2SpanId).text();

            var _col3SpandId = _gKPIHospitalTable_Col3SubCategory_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col3Value = $("#" + _col3SpandId).text();

            var _col4SpanId = _gKPIHospitalTable_Col4UnitOfMeasure_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col4Value = $("#" + _col4SpanId).text();

            var _col5SpanId = _gKPIHospitalTable_Col5BeginningVolume_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col5Value = $("#" + _col5SpanId).text();

            var _col6SpanId = _gKPIHospitalTable_Col6InYear_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col6Value = $("#" + _col6SpanId).text();

            var _col7SpanId = _gKPIHospitalTable_Col7ClosingBalance_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col7Value = $("#" + _col7SpanId).text();

            var _col8TextBoxId = _gKPIHospitalTable_Col8ActualVolume_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col8Value = $("#" + _col8TextBoxId).val();

            console.log("_col8TextBoxId == " + _col8TextBoxId);
            console.log(_col8Value);

            if (_col8Value != null && _col8Value != "") {

                var _actualVolumeValid = Report_DecimalValidation(_col8Value);
                console.log("KPI section, Actual Volume isvalid : " + _actualVolumeValid);

                if (_actualVolumeValid == false) {
                    _isValid = 0;
                    _errorMessages.push("kPI Section, Actual Volume input is invalid, ex 45.21");
                }
            }

            let _newLineItem = new FLTReportRevenueLineUpdateVM();
            _newLineItem.FLTReportRevenueLineID = _revenueLineId;
            _newLineItem.ReportVolume = _col8Value;
            _kpiLineItems.push(_newLineItem);

        });


    }
    else
    {


        var tableBodyId = _gKPINonHospitalTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;
     
        console.log("tableBodyId = " + tableBodyId);

        $("#" + tableBodyId + " > tr").each(function (index, element) {

            var _revenueLineId = $(this).data("revenuelineid");

            var _col1SpanId = _gKPINonHospitalTable_Col1TPBE_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col1Value = $("#" + _col1SpanId).text();

            var _col2SpanId = _gkPINonHospitalTable_Col2FunctionalCenter_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col2Value = $("#" + _col2SpanId).text();

            var _col3SpandId = _gKPINonHospitalTable_Col3Activity_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col3Value = $("#" + _col3SpandId).text();

            var _col4SpanId = _gKPINonHospitalTable_Col4BeginningVolume_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col4Value = $("#" + _col4SpanId).text();

            var _col5SpanId = _gKPINonHospitalTable_Col5InYear_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col5Value = $("#" + _col5SpanId).text();

            var _col6SpanId = _gKPINonHospitalTable_Col6ClosingBalance_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col6Value = $("#" + _col6SpanId).text();

            var _col7TextBoxId = _gKPINonHospitalTable_Col7ActualVolume_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + index;
            var _col7Value = $("#" + _col7TextBoxId).val();

         
            console.log("_col7TextBoxId == " + _col7TextBoxId);
            console.log(_col7Value);

            if (_col7Value != null && _col7Value != "") {

                var _actualVolumeValid = Report_DecimalValidation(_col7Value);
                console.log("KPI section, Actual Volume isvalid : " + _actualVolumeValid);

                if (_actualVolumeValid == false) {
                    _isValid = 0;
                    _errorMessages.push("kPI Section, Actual Volume input is invalid, ex 45.21");
                }
            }


            let _newLineItem = new FLTReportRevenueLineUpdateVM();
            _newLineItem.FLTReportRevenueLineID = _revenueLineId;
            _newLineItem.ReportVolume = _col7Value;
            _kpiLineItems.push(_newLineItem);

        });


    }


    return { isValid: _isValid, errorMessages: _errorMessages, lineItems: _kpiLineItems };

}




function btnTabSave_GetAdHocInput(sheetObj, adHocSectionObj) {


    var _isValid = 1;
    var _errorMessages = [];
    var _adHocLineItems = [];
  
    console.log("btnTabSave_GetAdHocInput() was called .");
    var tableBodyId = _gAdHoc_TableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID;
    console.log("tableBodyId = " + tableBodyId);


    $("#" + tableBodyId + " > tr").each(function (trIndex, elementTR) {


        $(elementTR).find('td').each(function (tdIndex, elementTD) {

            var _tdId = $(elementTD).attr("id");
            var _tdHasElement = $(elementTD).data("haselement");
            var _cellId = $(elementTD).data("cellid");
            var _cellDataType = $(elementTD).data("type");
            var _cellDataFormat = $(elementTD).data("format");
            var _cellReadOnly = $(elementTD).data("readonly");
            console.log("Tdid =" + _tdId + "   reportcellid =" + _cellId + "  dataType=" + _cellDataType + "  readOnly=" + _cellReadOnly + " td has element =" + _tdHasElement);

            var _tdIdArr = _tdId.split("_");
            var _elementId = "";
            var _elementValue = "";

            if (_tdHasElement == "1")
            {

                let _newLineItem = new FLTReportCellUpdateVM();
                _newLineItem.FLTReportCellID = _cellId;
                _newLineItem.DataType = _cellDataType;


                if (_cellReadOnly == "1") {
                    _elementId = _gAdHoc_TdSpanIdPrefix + _tdIdArr[1] + "_" + _tdIdArr[2] + "_" + _tdIdArr[3] + "_" + _tdIdArr[4];
                    _elementValue = $("#" + _elementId).text();

                    if (_elementValue != null && _elementValue != "") {
                        if (_cellDataFormat == _gDataFormat_Currency) {
                            _elementValue = _elementValue.replace(/,/g, '');
                            _elementValue = _elementValue.replace('$', '');
                        }
                    }

                    // not valiation
                    if (_cellDataType == _gDataType_Text) {
                        _newLineItem.TextValue = _elementValue;

                    } else if (_cellDataType == _gDataType_Numeric) {

                        _newLineItem.NumericValue = parseInt(_elementValue);

                    } else if (_cellDataType == _gDataType_Decimal) {

                        _newLineItem.DecimalValue = parseFloat(_elementValue);

                    } else if (_cellDataType == _gDataType_Date) {

                        _newLineItem.DateValueStr = _elementValue;
                    }

                }
                else
                {
                    _elementId = _gAdHoc_IdTextBoxIdPrefix + _tdIdArr[1] + "_" + _tdIdArr[2] + "_" + _tdIdArr[3] + "_" + _tdIdArr[4];
                    _elementValue = $("#" + _elementId).val();

                    // validate
                    if (_elementValue != null && _elementValue != "") {
                        if (_cellDataType == _gDataType_Text) {
                            _newLineItem.TextValue = _elementValue;

                        } else if (_cellDataType == _gDataType_Numeric) {

                            var _isValidNumeric = Report_NumberOnlyValidation(_elementValue);
                            if (_isValidNumeric == false) {
                                _isValid = 0;
                                _errorMessages.push("Additional KPI Section, Row " + _tdIdArr[3] + " Column " + _tdIdArr[4] + " element is invalid, ex 45");
                            }

                            _newLineItem.NumericValue = parseInt(_elementValue);

                        } else if (_cellDataType == _gDataType_Decimal) {

                            if (_cellDataFormat == _gDataFormat_Currency)
                            {

                                var _isValidCurrency = Report_CurrencyFormatValidation_WithoutDollarSign(_elementValue);

                                if (_isValidCurrency == false) {
                                    _isValid = 0;
                                    _errorMessages.push("Additional KPI Section, Row " + _tdIdArr[3] + " Column " + _tdIdArr[4] + " element  is invalid, ex 1,145.00");
                                }
                                var _tempCurrency = _elementValue;
                                var _tempDecimal = _tempCurrency.replace(/,/g, '');
                                _newLineItem.DecimalValue = parseFloat(_tempDecimal);

                            } else {

                                var _isValidDecimal = Report_DecimalValidation(_elementValue);

                                if (_isValidDecimal == false) {
                                    _isValid = 0;
                                    _errorMessages.push("Additional KPI Section, Row " + _tdIdArr[3] + " Column " + _tdIdArr[4] + " element  is invalid, ex 45.00");
                                }

                                _newLineItem.DecimalValue = parseFloat(_elementValue);
                            }


                        } else if (_cellDataType == _gDataType_Date) {

                            var _isValidDate = Report_DateFormatValidation(_elementValue);

                            if (_isValidDate == false) {
                                _isValid = 0;
                                _errorMessages.push("Additonal KPI Section, Row " + _tdIdArr[3] + " Column " + _tdIdArr[4] + " element  is invalid, ex MM/dd/YYYY");
                            }

                            _newLineItem.DateValueStr = _elementValue;

                        }

                    }

                }


                _adHocLineItems.push(_newLineItem);
            }

        });
    });

  

    return { isValid: _isValid, errorMessages: _errorMessages, lineItems: _adHocLineItems };

}






function ajax_ReportApi_GetReportTemplateInstance_ByFundingDetailId(id) {

    console.log("ajax_ReportApi_GetReportTemplateInstance_ByFundingDetailId() id = " + id);

    $.ajax({
        url: '/api/ReportApi/GetReportTemplateInstance_ByFundingDetailId/',
        type: 'POST',
        data: JSON.stringify({ fundingLetterReport_FundingDetailId: id }),
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
            // $("#HospitalRevenueLineModal_TargetMessage").html(err.message);
            // $("#HospitalRevenueLineModal_TargetMessage").addClass("text-danger");
            // console.warn("/api/ReportTemplateApi/SaveTemplate/" + err.message);
            console.warn("/api/ReportApi/GetReportTemplateInstance_ByFundingDetailId/" + err.message);
            showModalAlert("Funding Letter Report Template Failed", "Please close modal window , try again later ...");
        }

    });
   

}




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


function ReportTemplate_DisplayReportTitle(reportTemplateObj)
{
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

    if (_gReportFrequency_OneTime == reportTemplateObj.reportFrequency) {
        $("#OneTimeLabel").text('One Time Date');
        $("#OneTimeDateColumn").show();
    }

    if (_gReportFrequency_Monthly == reportTemplateObj.reportFrequency ) {
        $("#OneTimeLabel").text('Period');

        var fiscalMonth = parseInt(reportTemplateObj.fiscalMonth);
        console.log("Fiscal Month : " + fiscalMonth);
        switch (fiscalMonth) {
            case 1:
                $("#OneTimeDateTxt").val('January');
                break;
            case 2:
                $("#OneTimeDateTxt").val('February');
                break;
            case 3:
                $("#OneTimeDateTxt").val('March');
                break;
            case 4:
                $("#OneTimeDateTxt").val('April');
                break;
            case 5:
                $("#OneTimeDateTxt").val('May');
                break;
            case 6:
                $("#OneTimeDateTxt").val('June');
                break;
            case 7:
                $("#OneTimeDateTxt").val('July');
                break;
            case 8:
                $("#OneTimeDateTxt").val('August');
                break;
            case 9:
                $("#OneTimeDateTxt").val('September');
                break;
            case 10:
                $("#OneTimeDateTxt").val('October');
                break;
            case 11:
                $("#OneTimeDateTxt").val('November');
                break;
            case 12:
                $("#OneTimeDateTxt").val('December');
                break;
            default:
                $("#OneTimeDateTxt").val('');
        }

        $("#OneTimeDateColumn").show();
    }


    if (_gReportFrequency_Quarterly == reportTemplateObj.reportFrequency) {
        $("#OneTimeLabel").text('Period');

        var fiscalQuarter = parseInt(reportTemplateObj.fiscalQuarter);
        console.log("Fiscal Quarter : " + fiscalQuarter);
        switch (fiscalQuarter) {
            case 1:
                $("#OneTimeDateTxt").val('Q1');
                break;
            case 2:
                $("#OneTimeDateTxt").val('Q2');
                break;
            case 3:
                $("#OneTimeDateTxt").val('Q3');
                break;
            case 4:
                $("#OneTimeDateTxt").val('Q4');
                break;
            default:
                $("#OneTimeDateTxt").val('');
        }

        $("#OneTimeDateColumn").show();
    }


    if (_gReportFrequency_Annually == reportTemplateObj.reportFrequency) {
        $("#OneTimeLabel").text('Period');

        var fiscalYear = parseInt(reportTemplateObj.fiscalYear);
        console.log("Fiscal Year : " + fiscalYear);
        $("#OneTimeDateTxt").val(fiscalYear);
        $("#OneTimeDateColumn").show();
    }




   
    for (var i = 0; i < reportTemplateObj.fltReportSheets.length; i++) {

        var _sheetObj = reportTemplateObj.fltReportSheets[i];

        var _isActiveTab = 0;

        _isActiveTab = (i == 0) ? 1 : 0;

        ReportTemplate_BuildSheet(_sheetObj, _isActiveTab);

    }

    RegisterBtnTabSaveEvent();

}



// sheetObj
function ReportTemplate_BuildSheet(sheetObj, isActiveSheet) {


    console.log("ReportTemplate_BuildSheet() was called .");
    console.log(sheetObj.fltReportSheetID + ",  " + sheetObj.sheetName + ",  " + sheetObj.sheetTitle + " , " + isActiveSheet);

    var _sheetName = "";
    _sheetName = sheetObj.sheetName;

    if (sheetObj.sheetName != null && sheetObj.sheetName != "") {
        if (sheetObj.sheetName.length > 20) {
            _sheetName = sheetObj.sheetName.substring(0, 20);
        }
    }

    var _hrefValue = "#" + sheetObj.fltReportSheetID;
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
            <a href="${_hrefValue}" aria-control="${sheetObj.sheetId}" role="tab" data-toggle="tab" title="${sheetObj.sheetName}"> ${_sheetName} </a>
         </li>
        `;
    // console.log(_appendTabHeaderli);

    $("#tabHeaderContainer").append(_appendTabHeaderli);


    var _headerDivId = _gSheetHeaderDivPrefix + sheetObj.fltReportSheetID;
    var _headerOlId = _gSheetHeaderDivOlPrefix + sheetObj.fltReportSheetID;
    var _footerDivId = _gSheetFooterDivPrefix + sheetObj.fltReportSheetID;
    var _footerOlId = _gSheetFooterDivOlPrefix + sheetObj.fltReportSheetID;

    var _deliverableSectionDivId = _gSheetDeliverableSectionDivPrefix + sheetObj.fltReportSheetID;
    var _milestoneSectionDivId = _gSheetMilestoneSectionDivPrefix + sheetObj.fltReportSheetID;
    var _keyPerformanceIndicatorDivId = _gSheetKeyPerformanceIndicatorSectionDivPrefix + sheetObj.fltReportSheetID;
    var _kpiDivId = _gSheetKPISectionDivPrefix + sheetObj.fltReportSheetID;
    var _adHocDivId = _gSheetAdHocSectionDivPreifx + sheetObj.fltReportSheetID;

    var _btnSave_TopId = "btnSave_" + sheetObj.fltReportSheetID;
    var _btnSave_BotId = "btnSave_" + sheetObj.fltReportSheetID;


    var _appendTabContent = ` 
                             <div role="tabpanel" class="${_tablConentDivClass}" id="${sheetObj.fltReportSheetID}">
                                <div class="pull-right">
                                  <button type="button" class="btn btn-primary btnTabSave" id="${_btnSave_TopId}"> Save </button>
                                </div>
                                <br />

                              <h3> ${sheetObj.sheetTitle } </h3> </br/>

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

                             <div class="pull-right">
                                <button type="button" class="btn btn-primary btnTabSave" id="${_btnSave_BotId}"> Save </button>
                              </div>

                     </div>
           `;

    $("#tabContentContainer").append(_appendTabContent);


    ReportTemplate_BuildSheet_Headers(sheetObj);

    ReportTemplate_BuildSheet_Footers(sheetObj);

    if (sheetObj.fltReportSections.length > 0)
    {
        for (var i = 0; i < sheetObj.fltReportSections.length; i++) {

            var _sectionObj = sheetObj.fltReportSections[i];

            if (_sectionObj != null && _sectionObj != undefined && _sectionObj != "") {

                if (_sectionObj.sectionTypeID == _gSectionType_Deliverable) {

                    ReportTemplate_BuildSheet_DeliverableSection(sheetObj, _sectionObj);

                } else if (_sectionObj.sectionTypeID == _gSectionType_Milestone) {

                    ReportTemplate_BuildSheet_MilestoneSection(sheetObj, _sectionObj);

                } else if (_sectionObj.sectionTypeID == _gSectionType_KeyPerformanceIndicator) {

                    ReportTemplate_BuildSheet_KeyPerformanceIndicatorSection(sheetObj, _sectionObj);

                } else if (_sectionObj.sectionTypeID == _gSectionType_KPI) {

                    ReportTemplate_BuildSheet_KPISection(sheetObj, _sectionObj);

                } else if (_sectionObj.sectionTypeID == _gSectionType_AdHoc ) {

                    ReportTemplate_BuildSheet_AdHocSection(sheetObj, _sectionObj);
                }
            }

        }

    }


}



function ReportTemplate_BuildSheet_Headers(sheetObj)
{
    var _sheetHeaderOlId = _gSheetHeaderDivOlPrefix + sheetObj.fltReportSheetID;

    if (sheetObj.fltReportNotes.length > 0)
    {
        for (var i = 0; i < sheetObj.fltReportNotes.length; i++)
        {
            var _reportNoteObj = sheetObj.fltReportNotes[i];
           
            if (_reportNoteObj.noteType == 1) {
                /*   $("#" + _sheetHeaderOlId).append("<li>" + _reportNoteObj.description + "</li>");*/
                $("#" + _sheetHeaderOlId).append(_reportNoteObj.description + "</br>");
            }
        }
    }

}



function ReportTemplate_BuildSheet_Footers(sheetObj) {
    var _sheetfooterOlId = _gSheetFooterDivOlPrefix + sheetObj.fltReportSheetID;

    if (sheetObj.fltReportNotes.length > 0) {
        for (var i = 0; i < sheetObj.fltReportNotes.length; i++) {
            var _reportNoteObj = sheetObj.fltReportNotes[i];

            if (_reportNoteObj.noteType == 2) {
                $("#" + _sheetfooterOlId).append("<li>" + _reportNoteObj.description + "</li>");
            }
        }
    }
}



function ReportTemplate_BuildSheet_DeliverableSection(sheetObj, deliverableSectionObj) {

    var _deliverableSectionDivId = _gSheetDeliverableSectionDivPrefix + sheetObj.fltReportSheetID;

 

    var _deliverableSectionName = "";
    if (deliverableSectionObj.sectionName != null && deliverableSectionObj.sectionName != "") {
        _deliverableSectionName = deliverableSectionObj.sectionName;
    }

    var _deliverableSectionTitle = "";
    if (deliverableSectionObj.sectionTitle != null && deliverableSectionObj.sectionTitle != "" ) {
        _deliverableSectionTitle = deliverableSectionObj.sectionTitle;
    }
   
  
    var _sectionName  = "<h4>Deliverable Section Name:  " + _deliverableSectionName  + "</h4> ";
    var _sectionTitle = "<h4>Deliverable Section Title: " + _deliverableSectionTitle +  "</h4>";


    $("#" + _deliverableSectionDivId).append(_sectionName);
    $("#" + _deliverableSectionDivId).append(_sectionTitle);


    // has Deliverables
    if (deliverableSectionObj.fltReportDeliverables.length > 0)
    {
      
        var _deliverableSectionTableId = _gDeliverableTableIdPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID;
        var _deliverableSectionTableBodyId = _gDeliverableTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID ;

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

        $("#" + _deliverableSectionDivId).append(_deliverableTable);


        for (var i = 0; i < deliverableSectionObj.fltReportDeliverables.length; i++) {
            var _deliverableLineItem = deliverableSectionObj.fltReportDeliverables[i];

            var _col1DeliverableSpanId = _gDeliverableTable_Col1Deliverable_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID + "_" + i;
            var _col2HspCommentTextAreaId = _gDeliverableTable_Col2HspComment_TextAreaIdPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID + "_" + i;
            var _col2HspCommentTextAreaClass = _gDeliverableTable_Col2HspCommentClassPrefix + sheetObj.fltReportSheetID + "_" + deliverableSectionObj.fltReportSectionID ;

            var _deliverableCol1Value = "";
            var _deliverableCol2Value = "";

            if (_deliverableLineItem.deliverable.deliverableDescription != null && _deliverableLineItem.deliverable.deliverableDescription != "") {
                _deliverableCol1Value = _deliverableLineItem.deliverable.deliverableDescription;
            }


            if (_deliverableLineItem.explanation != null && _deliverableLineItem.explanation != "") {
                _deliverableCol2Value = _deliverableLineItem.explanation;
            }

            var _fltReportDeliverableID = _deliverableLineItem.fltReportDeliverableID;
            var _deliverableID = _deliverableLineItem.deliverableID;

            var _trLine = `<tr data-fltreportdeliverableid="${_fltReportDeliverableID}" data-deliverableid="${_deliverableID}">
                        <td> <span id="${_col1DeliverableSpanId}">  ${_deliverableCol1Value} </span> </td>
                        <td> <textarea id="${_col2HspCommentTextAreaId}" rows="2" class="${_col2HspCommentTextAreaClass}  form-control">${_deliverableCol2Value}</textarea> </td>
                </tr>
            `;

            $("#" + _deliverableSectionTableBodyId).append(_trLine);

        }

    }


    // Deliverable Notes
    if (deliverableSectionObj.fltReportNotes.length > 0)
    {
        $("#" + _deliverableSectionDivId).append("<h4>Deliverable Notes </h4>");

        var _deliverableUlNotesId = "DiverableNotesUl_" + sheetObj.fltReportSheetID;

        var _ul = `<ul id = "${_deliverableUlNotesId}"> </ul>`;

        $("#" + _deliverableSectionDivId).append(_ul);

        for (var i = 0; i < deliverableSectionObj.fltReportNotes.length; i++)
        {
            var _noteObj = deliverableSectionObj.fltReportNotes[i];

            if (_noteObj.description != null && _noteObj.description != "" && _noteObj.description != " ")
            {
                $("#" + _deliverableUlNotesId).append("<li>" + _noteObj.description +  "</li>");
            }
        }


    }


}



function ReportTemplate_BuildSheet_MilestoneSection(sheetObj, milestoneSectionObj) {

    var _milestonSectionDivId = _gSheetMilestoneSectionDivPrefix + sheetObj.fltReportSheetID;

 
    var _milestoneSectionName = "";
    if (milestoneSectionObj.sectionName != null && milestoneSectionObj.sectionName != "") {
        _milestoneSectionName = milestoneSectionObj.sectionName;
    }

    var _milestoneSectionTitle = "";
    if (milestoneSectionObj.sectionTitle != null && milestoneSectionObj.sectionTitle != "") {
        _milestoneSectionTitle = milestoneSectionObj.sectionTitle;
    }


    var _sectionName  = "<h4>Milestone Section Name: "  + _milestoneSectionName +  "</h4> ";
    var _sectionTitle = "<h4>Milestone Section Title: " + _milestoneSectionTitle + "</h4>";

    $("#" + _milestonSectionDivId).append(_sectionName);
    $("#" + _milestonSectionDivId).append(_sectionTitle);


    // has milestones
    if (milestoneSectionObj.fltReportMilestones.length > 0)
    {

        var _milestonSectionTableId = _gMilestoneTableIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID;
        var _milestoneSectionTableBodyId = _gMilestoneTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID ;

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

        $("#" + _milestonSectionDivId).append(_milestoneTable);

        for (var i = 0; i < milestoneSectionObj.fltReportMilestones.length; i++)
        {
            var _milestoneLineItem = milestoneSectionObj.fltReportMilestones[i];

            var _col1MilestoneSpanId = _gMilestoneTable_Col1Milestone_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + i;
            var _col2StartDateSpanId = _gMilestoneTable_Col2StartDate_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + i;
            var _col3EstimatedPercentCompleteTextBoxId = _gMilestoneTable_Col3EstimatedPercentComplete_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + i;
            var _col3EstimatedPercentCompleteTextBoxClass = _gMilestoneTable_Col3EstimatedPercentCompleteClass + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID;
            var _col4ActualStartDateTextBoxId = _gMilestoneTable_Col4ActualCompletionDate_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + i;
            var _col4ActualStartDateTextBoxClass = _gMilestoneTable_Col4ActualCompletionDateClass + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID;
            var _col4CommentsTextAreaId = _gMilestoneTable_Col5Comments_TextAreaIdPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID + "_" + i;
            var _col4CommentsTextAreaClass = _gMilestoneTable_Col5CommentsClassPrefix + sheetObj.fltReportSheetID + "_" + milestoneSectionObj.fltReportSectionID ;


            var _milestoneCol1Value = "";
            var _milestoneCol2Value = "";
            var _milestoneCol3Value = "";
            var _milestoneCol4Value = "";
            var _milestoneCol5Value = "";

            if (_milestoneLineItem.milestone.milestoneDescription != null && _milestoneLineItem.milestone.milestoneDescription  != "") {
                _milestoneCol1Value = _milestoneLineItem.milestone.milestoneDescription ;
            }

            if (_milestoneLineItem.milestone.milestoneStartDate != null && _milestoneLineItem.milestone.milestoneStartDate != "") {
                // actualDate: "2022-06-15T14:05:51.463"
                _milestoneCol2Value = ConvertServerDateStrToMM_DD_YYYY(_milestoneLineItem.milestone.milestoneStartDate);
            }

            // _milestoneCol3  => 
            if (_milestoneLineItem.estimatedCompletion != null && _milestoneLineItem.estimatedCompletion != "") {
              
                _milestoneCol3Value = _milestoneLineItem.estimatedCompletion;
            }


            // _milestoneCol4 => 
            if (_milestoneLineItem.actualDate != null && _milestoneLineItem.actualDate != "") {
                // actualDate: "2022-06-15T14:05:51.463"
                _milestoneCol4Value = ConvertServerDateStrToMM_DD_YYYY(_milestoneLineItem.actualDate);
            }


            if (_milestoneLineItem.explanation != null && _milestoneLineItem.explanation != "") {
                _milestoneCol5Value = _milestoneLineItem.explanation;
            }


            // var _milestoneID = _milestoneLineItem.milestoneID;
            var _fltReportMilestoneID = _milestoneLineItem.fltReportMilestoneID;

            var _trLine = `<tr data-fltreportmilestoneid="${_fltReportMilestoneID}">
                        <td> <span id="${_col1MilestoneSpanId}"> ${ _milestoneCol1Value} </span>  </td>
                        <td> <span id="${_col2StartDateSpanId}"> ${ _milestoneCol2Value}  </span> </td>
                        <td> <input type="text" maxlength="${_gTextBoxMaxLength}"  id="${_col3EstimatedPercentCompleteTextBoxId}" class="${_col3EstimatedPercentCompleteTextBoxClass}  form-control"  value="${_milestoneCol3Value}"  />  </td>
                        <td>
                                <div class="input-group date">
                                       <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                       <input type="text" maxlength="${_gTextBoxMaxLength}"  id="${_col4ActualStartDateTextBoxId}" class="${_col4ActualStartDateTextBoxClass} form-control" value="${_milestoneCol4Value}" />
                                </div>
           
                        </td>
                        <td> <textarea id="${_col4CommentsTextAreaId}" class="${_col4CommentsTextAreaClass} form-control" rows="2">${ _milestoneCol5Value}</textarea></td>
                </tr>
                `;

            $("#" + _milestoneSectionTableBodyId).append(_trLine);
        }


    }

    InputTextBox_RegisterDatePicker();
   
    // Milestone Notes
    if (milestoneSectionObj.fltReportNotes.length > 0) {
        $("#" + _milestonSectionDivId).append("<h4>Milesone Notes </h4>");

        var _milestoneUlNotesId = "MilestoneNotesUl_" + sheetObj.fltReportSheetID;

        var _ul = `<ul id = "${_milestoneUlNotesId}"> </ul>`;

        $("#" + _milestonSectionDivId).append(_ul);

        for (var i = 0; i < milestoneSectionObj.fltReportNotes.length; i++) {
            var _noteObj = milestoneSectionObj.fltReportNotes[i];

            if (_noteObj.description != null && _noteObj.description != "" && _noteObj.description != " ") {
                $("#" + _milestoneUlNotesId).append("<li>" + _noteObj.description + "</li>");
            }
        }

    }


}



function ReportTemplate_BuildSheet_KeyPerformanceIndicatorSection(sheetObj, keyPerIndicatorSectionObj) {


    var _keyPerIndicatorSectionDivId = _gSheetKeyPerformanceIndicatorSectionDivPrefix + sheetObj.fltReportSheetID;

    var _keyPerformanceIndicatorSectionName = "";
    if (keyPerIndicatorSectionObj.sectionName != null && keyPerIndicatorSectionObj.sectionName != "") {
        _keyPerformanceIndicatorSectionName = keyPerIndicatorSectionObj.sectionName;
    }

    var _keyPerformanceIndicatorSectionTitle = "";
    if (keyPerIndicatorSectionObj.sectionTitle != null && keyPerIndicatorSectionObj.sectionTitle != "") {
        _keyPerformanceIndicatorSectionTitle = keyPerIndicatorSectionObj.sectionTitle;
    }

    var _sectionName  = "<h4>Key Performance Indicator Section Name: "  + _keyPerformanceIndicatorSectionName   + "</h4> ";
    var _sectionTitle = "<h4>Key Performance Indicator Section Title: " + _keyPerformanceIndicatorSectionTitle  + "</h4>";

    $("#" + _keyPerIndicatorSectionDivId).append(_sectionName);
    $("#" + _keyPerIndicatorSectionDivId).append(_sectionTitle);



    if (keyPerIndicatorSectionObj.fltReportIndicators.length > 0 )
    {
        var _keyPerIndSectionTableId     = _gKeyPerIndicatorTableIdPrefix     + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID;
        var _keyPerIndSectionTableBodyId = _gKeyPerIndicatorTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID;

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

        $("#" + _keyPerIndicatorSectionDivId).append(_kpiTable);


        for (var i = 0; i < keyPerIndicatorSectionObj.fltReportIndicators.length; i++)
        {
            var _kpiLineItem = keyPerIndicatorSectionObj.fltReportIndicators[i];

            var _col1PerformanceIndicatorSpanId = _gKeyPerIndicatorTable_Col1PerformanceIndicator_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID + "_" + i;
            var _col2BaseLineSpanId = _gKeyPerIndicatorTable_Col2BaseLine_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID + "_" + i;
            var _col3ProgessSoFarTextBoxId = _gKeyPerIndicatorTable_Col3ProgessSoFar_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID + "_" + i;
            var _col3ProgressSoFarClass = _gKeyPerIndicatorTable_Col3ProgessSoFarClassPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID;
            var _col4TargetSpanId = _gKeyPerIndicatorTable_Col4Target_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID + "_" + i;
            var _col5CommentTextAreaId = _gKeyPerIndicatorTable_Col5Comments_TextAreaIdPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID + "_" + i;
            var _col5CommentTextAreaClass = _gKeyPerIndicatorTable_Col5CommentsClassPrefix + sheetObj.fltReportSheetID + "_" + keyPerIndicatorSectionObj.fltReportSectionID;

            var _keyPerIndicatorCol1Value = "";
            var _keyPerIndicatorCol2Value = "";
            var _keyPerIndicatorCol3Value = "";
            var _keyPerIndicatorCol4Value = "";
            var _keyPerIndicatorCol5Value = "";

            if (_kpiLineItem.performanceIndicator.performanceIndicator1 != null && _kpiLineItem.performanceIndicator.performanceIndicator1 != "") {
                _keyPerIndicatorCol1Value = _kpiLineItem.performanceIndicator.performanceIndicator1;
            }

            if (_kpiLineItem.performanceIndicator.baseline != null && _kpiLineItem.performanceIndicator.baseline != "") {
                
                _keyPerIndicatorCol2Value = _kpiLineItem.performanceIndicator.baseline ;
              }


            if (_kpiLineItem.progress != null && _kpiLineItem.progress.target != "") {

                _keyPerIndicatorCol3Value = _kpiLineItem.progress;
            }


            if (_kpiLineItem.performanceIndicator.target != null && _kpiLineItem.performanceIndicator.target != "") {
     
                _keyPerIndicatorCol4Value = _kpiLineItem.performanceIndicator.target;
            }


            if (_kpiLineItem.explanation != null && _kpiLineItem.explanation != "") {
                _keyPerIndicatorCol5Value = _kpiLineItem.explanation;
            }

            var _indicatorID = _kpiLineItem.fltReportIndicatorID;

            var _trLine = `<tr data-indicatorid="${_indicatorID}">
                        <td> <span  id="${_col1PerformanceIndicatorSpanId}">  ${_keyPerIndicatorCol1Value} </span> </td>
                        <td> <span  id="${_col2BaseLineSpanId}"> ${_keyPerIndicatorCol2Value} </span></td>
                        <td> <input id="${_col3ProgessSoFarTextBoxId}" type="text"  maxlength="${_gTextBoxMaxLength}"   class="${_col3ProgressSoFarClass} form-control"  value="${_keyPerIndicatorCol3Value}" /> </td>
                        <td> <span  id="${_col4TargetSpanId}">  ${_keyPerIndicatorCol4Value} </span> </td>
                        <td> <textarea  id="${_col5CommentTextAreaId}" class="${_col5CommentTextAreaClass} form-control" rows="2">${_keyPerIndicatorCol5Value}</textarea> </td>
                </tr>
                `;

            $("#" + _keyPerIndSectionTableBodyId).append(_trLine);

        }

    }


    // KPI Notes
    if (keyPerIndicatorSectionObj.fltReportNotes.length > 0) {
        $("#" + _keyPerIndicatorSectionDivId).append("<h4>Key Performance Indicator Notes </h4>");

        var _kpiUlNotesId = "KeyPerformanceIndicatorNotesUl_" + sheetObj.fltReportSheetID;

        var _ul = `<ul id = "${_kpiUlNotesId}"> </ul>`;

        $("#" + _keyPerIndicatorSectionDivId).append(_ul);

        for (var i = 0; i < keyPerIndicatorSectionObj.fltReportNotes.length; i++) {
            var _noteObj = keyPerIndicatorSectionObj.fltReportNotes[i];

            if (_noteObj.description != null && _noteObj.description != "" && _noteObj.description != " ") {
                $("#" + _kpiUlNotesId).append("<li>" + _noteObj.description + "</li>");
            }
        }

    }



}



function ReportTemplate_BuildSheet_KPISection(sheetObj, kpiSectionObj) {


    var _kpiSectionDivId = _gSheetKPISectionDivPrefix + sheetObj.fltReportSheetID;

    var _kpiSectionName = "";
    if (kpiSectionObj.sectionName != null && kpiSectionObj.sectionName != "") {
        kpiSectionName = kpiSectionObj.sectionName;
    }

    var _kpiSectionTitle = "";
    if (kpiSectionObj.sectionTitle != null && kpiSectionObj.sectionTitle != "") {
        _kpiSectionTitle = kpiSectionObj.sectionTitle;
    }


    var _sectionName = "<h4> KPI Section Name: " + _kpiSectionName + "</h4> ";
    var _sectionTitle = "<h4> KPI Section Title: " + _kpiSectionTitle + "</h4>";

    $("#" + _kpiSectionDivId).append(_sectionName);
    $("#" + _kpiSectionDivId).append(_sectionTitle);


    // Here Determine Hospital Sector Or Non-Hospital
    if (kpiSectionObj.fltReportRevenueLines.length > 0) {

        var _revenueLineObj = kpiSectionObj.fltReportRevenueLines[0];

        console.log("functional center : " + _revenueLineObj.functionalCenter);

        // _revenueLineObj.functionalCenter
        if (_revenueLineObj.fundingRevenueLineBalance.saaSectorID == "1" || _revenueLineObj.fundingRevenueLineBalance.saaSectorID == "3") {
            // or _revenueLineObj.fundingRevenueLineBalance.saaSectorID == 1 or 3 (hospital Sector)
            ReportTemplate_BuildSheet_KPISection_HospitalSectorTable(sheetObj, kpiSectionObj);

        } else {
            // or _revenueLineObj.fundingRevenueLineBalance.saaSectorID == 2 (no hospital Sector)
            ReportTemplate_BuildSheet_KPISection_NonHospitalSectorTable(sheetObj, kpiSectionObj);
        }

    }

  
    // KPI Notes
    if (kpiSectionObj.fltReportNotes.length > 0) {
        $("#" + _kpiSectionDivId).append("<h4> KPI Notes </h4>");

        var _kpiUlNotesId = "KPINotesUl_" + sheetObj.fltReportSheetID;

        var _ul = `<ul id = "${_kpiUlNotesId}"> </ul>`;

        $("#" + _kpiSectionDivId).append(_ul);

        for (var i = 0; i < kpiSectionObj.fltReportNotes.length; i++) {
            var _noteObj = kpiSectionObj.fltReportNotes[i];

            if (_noteObj.description != null && _noteObj.description != "" && _noteObj.description != " ") {
                $("#" + _kpiUlNotesId).append("<li>" + _noteObj.description + "</li>");
            }
        }

    }


}



function ReportTemplate_BuildSheet_KPISection_HospitalSectorTable(sheetObj, kpiSectionObj){

    console.log("ReportTemplate_BuildSheet_KPISection_HospitalSectorTable() was callled . ");

    var _kpiSectionDivId = _gSheetKPISectionDivPrefix + sheetObj.fltReportSheetID;


    if (kpiSectionObj.fltReportRevenueLines.length > 0) {
        var _kpiSectionTableId = _gKPIHospitalTableIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;
        var _kpiSectionTableBodyId = _gKPIHospitalTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;

        var _kpiTable = `
            <table class="table table-bordered" id="${_kpiSectionTableId}" >
                <thead class="thead-dark">
                    <tr>
                            <th> Program  </th>
                            <th> Category  </th>
                            <th> Sub Category  </th>
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

        $("#" + _kpiSectionDivId).append(_kpiTable);


        for (var i = 0; i < kpiSectionObj.fltReportRevenueLines.length; i++) {
            var _revenueLineItem = kpiSectionObj.fltReportRevenueLines[i];

            var _col1ProgramSpanId = _gKPIHospitalTable_Col1Program_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col2CategorySpanId = _gkPIHospitalTable_Col2Category_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col3SubCategorySpanId = _gKPIHospitalTable_Col3SubCategory_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col4UnitOfMeasureSpanId = _gKPIHospitalTable_Col4UnitOfMeasure_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col5BeginningVolumeSpanId = _gKPIHospitalTable_Col5BeginningVolume_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col6InYearSpanId = _gKPIHospitalTable_Col6InYear_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col7ClosingBalanceSpanId = _gKPIHospitalTable_Col7ClosingBalance_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col8ActualVolumeTextBoxId = _gKPIHospitalTable_Col8ActualVolume_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col8ActualVolumeClass = _gKPIHospitalTable_Col8ActualVolumeClassPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;

            var _kpiCol1_Program = "";
            var _kpiCol2_Category = "";
            var _kpiCol3_SubCategory = "";
            var _kpiCol4_UnitOfMeasure = "";
            var _kpiCol5_BeginningVolume = "";
            var _kpiCol6_InYear = "";
            var _kpiCol7_ClosingBalance = "";
            var _kpiCol8_ActualVolume = "";

            //var _kpiActualVolumeInputId = "kpiActualVolume_" + sheetObj.fltReportSheetID + "_" + i;
            //var _kpiActualVolumeClass = "kpiActualVolumeClass_" + sheetObj.fltReportSheetID;
            //var _kpiCol8_ActualVolume = '<input type="text" id="' + _kpiActualVolumeInputId + '"' + 'class="' + _kpiActualVolumeClass + '">';

            if (_revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramCategory.fundingProgram.fundingProgramDescription != null &&
                _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramCategory.fundingProgram.fundingProgramDescription != "") {
                _kpiCol1_Program = _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramCategory.fundingProgram.fundingProgramDescription;
            }

            if (_revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramCategory.fundingProgramCategoryDescription != null &&
                _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramCategory.fundingProgramCategoryDescription != "") {
             
                _kpiCol2_Category = _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramCategory.fundingProgramCategoryDescription;
            }

           
            if (_revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramSubCategoryDescription != null &&
                _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramSubCategoryDescription != "") {

                _kpiCol3_SubCategory = _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.fundingProgramSubCategoryDescription;
            }


            if (_revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.unitofMeasure.unitofMeasureDescription != null &&
                _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.unitofMeasure.unitofMeasureDescription  != "") {
               
                _kpiCol4_UnitOfMeasure = _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.unitofMeasure.unitofMeasureDescription ;
            }


            if (_revenueLineItem.fundingRevenueLineBalance.beginningVolume != null &&
                _revenueLineItem.fundingRevenueLineBalance.beginningVolume != "") {

                _kpiCol5_BeginningVolume = _revenueLineItem.fundingRevenueLineBalance.beginningVolume;
            }


            if (_revenueLineItem.fundingRevenueLineBalance.inYearIncrementalVolume != null &&
                _revenueLineItem.fundingRevenueLineBalance.inYearIncrementalVolume != "") {

                _kpiCol6_InYear = _revenueLineItem.fundingRevenueLineBalance.inYearIncrementalVolume;
            }
           

            if (_revenueLineItem.fundingRevenueLineBalance.closingBalance != null &&
                _revenueLineItem.fundingRevenueLineBalance.closingBalance != "") {

                _kpiCol7_ClosingBalance = _revenueLineItem.fundingRevenueLineBalance.closingBalance;
            }

            // _kpiCol8_ActualVolume
            if (_revenueLineItem.reportVolume != null) {
                _kpiCol8_ActualVolume = _revenueLineItem.reportVolume;
            }

            var _revenueLineID = _revenueLineItem.fltReportRevenueLineID;

            var _trLine = `<tr data-revenuelineid="${_revenueLineID}">
                        <td> <span id="${_col1ProgramSpanId}"> ${_kpiCol1_Program}       </span> </td>
                        <td> <span id="${_col2CategorySpanId}"> ${_kpiCol2_Category}      </span> </td>
                        <td> <span id="${_col3SubCategorySpanId}"> ${_kpiCol3_SubCategory}   </span> </td>
                        <td> <span id="${_col4UnitOfMeasureSpanId}"> ${_kpiCol4_UnitOfMeasure} </span> </td>
                        <td> <span id="${_col5BeginningVolumeSpanId}"> ${_kpiCol5_BeginningVolume} </span> </td>
                        <td> <span id="${_col6InYearSpanId}"> ${_kpiCol6_InYear} </span> </td>
                        <td> <span id="${_col7ClosingBalanceSpanId}"> ${_kpiCol7_ClosingBalance} </span> </td>
                        <td> <input type="text" id="${_col8ActualVolumeTextBoxId}" maxlength="${_gTextBoxMaxLength}"  class="${_col8ActualVolumeClass} form-control" value="${_kpiCol8_ActualVolume}"  />   </td>
                </tr>
                `;

            $("#" + _kpiSectionTableBodyId).append(_trLine);

        }

    }




}




function ReportTemplate_BuildSheet_KPISection_NonHospitalSectorTable(sheetObj, kpiSectionObj) {

    console.log("ReportTemplate_BuildSheet_KPISection_NonHospitalSectorTable() was callled . ");

    var _kpiSectionDivId = _gSheetKPISectionDivPrefix + sheetObj.fltReportSheetID;

    if (kpiSectionObj.fltReportRevenueLines.length > 0) {

        var _kpiSectionTableId = _gKPINonHospitalTableIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;
        var _kpiSectionTableBodyId = _gKPINonHospitalTableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;

        var _kpiTable = `
            <table class="table table-bordered" id="${_kpiSectionTableId}" >
                <thead class="thead-dark">
                    <tr>
                            <th> TPBE  </th>
                            <th> Functional Center </th>
                            <th> Activity  </th>
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

        $("#" + _kpiSectionDivId).append(_kpiTable);

        for (var i = 0; i < kpiSectionObj.fltReportRevenueLines.length; i++) {

            var _revenueLineItem = kpiSectionObj.fltReportRevenueLines[i];

            var _col1TPBESpanId = _gKPINonHospitalTable_Col1TPBE_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col2FunctionalCenterSpanId = _gkPINonHospitalTable_Col2FunctionalCenter_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" +i;
            var _col3ActivitySpanId = _gKPINonHospitalTable_Col3Activity_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col4BeginningVolumeSpanId = _gKPINonHospitalTable_Col4BeginningVolume_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" +i;
            var _col5InYearSpanId = _gKPINonHospitalTable_Col5InYear_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col6ClosingBalanceSpanId = _gKPINonHospitalTable_Col6ClosingBalance_SpanIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col7ActualVolumeTextBoxId = _gKPINonHospitalTable_Col7ActualVolume_TextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID + "_" + i;
            var _col7ActualVolumeClass = _gKPINonHospitalTable_Col7ActualVolumeClassPrefix + sheetObj.fltReportSheetID + "_" + kpiSectionObj.fltReportSectionID;

            var _kpiCol1_TPBE = "";
            var _kpiCol2_FunctionalCenter = "";
            var _kpiCol3_Activity = "";
            var _kpiCol4_BeginningVolume = "";
            var _kpiCol5_InYear = "";
            var _kpiCol6_ClosingBalance = "";
            var _kpiCol7_ActualVolume = "";

            if (_revenueLineItem.functionalCenter.tpbe.tpbeDescription != null &&
                _revenueLineItem.functionalCenter.tpbe.tpbeDescription != "") {
                _kpiCol1_TPBE = _revenueLineItem.functionalCenter.tpbe.tpbeDescription;
            }


            if (_revenueLineItem.functionalCenter.functionalCenterName != null &&
                _revenueLineItem.functionalCenter.functionalCenterName != "") {
                _kpiCol2_FunctionalCenter = _revenueLineItem.functionalCenter.functionalCenterName;
            }

            if (_revenueLineItem.fundingRevenueLine.unitofMeasure.unitofMeasureDescription != null &&
                _revenueLineItem.fundingRevenueLine.unitofMeasure.unitofMeasureDescription != "") {

              //  _kpiCol4_UnitOfMeasure = _revenueLineItem.fundingRevenueLine.fundingProgramSubCategory.unitofMeasure.unitofMeasureDescription;
                _kpiCol3_Activity = _revenueLineItem.fundingRevenueLine.unitofMeasure.unitofMeasureDescription;
            }

            //if (_revenueLineItem.fundingRevenueLineBalance.beginningVolume != null &&
            //    _revenueLineItem.fundingRevenueLineBalance.beginningVolume != "") {
            //    _kpiCol4_BeginningVolume = _revenueLineItem.fundingRevenueLineBalance.beginningVolume;
            //}

            if (_revenueLineItem.fundingRevenueLineBalance.beginningVolume != null) {
                _kpiCol4_BeginningVolume = _revenueLineItem.fundingRevenueLineBalance.beginningVolume;
            }

            // bugs
           // _kpiCol4_BeginningVolume = _revenueLineItem.fundingRevenueLineBalance.beginningVolume;

            if (_revenueLineItem.fundingRevenueLineBalance.inYearIncrementalVolume != null &&
                _revenueLineItem.fundingRevenueLineBalance.inYearIncrementalVolume != "") {

                _kpiCol5_InYear = _revenueLineItem.fundingRevenueLineBalance.inYearIncrementalVolume;
            }


            if (_revenueLineItem.fundingRevenueLineBalance.closingBalance != null &&
                _revenueLineItem.fundingRevenueLineBalance.closingBalance != "") {

                _kpiCol6_ClosingBalance = _revenueLineItem.fundingRevenueLineBalance.closingBalance;
            }


            if (_revenueLineItem.reportVolume != null) {

                _kpiCol7_ActualVolume = _revenueLineItem.reportVolume;
            }

            var _revenueLineID = _revenueLineItem.fltReportRevenueLineID;

            var _trLine = `<tr   data-revenuelineid="${_revenueLineID}" >
                        <td> <span id="${_col1TPBESpanId}"> ${_kpiCol1_TPBE}       </span> </td>
                        <td> <span id="${_col2FunctionalCenterSpanId}"> ${_kpiCol2_FunctionalCenter}      </span> </td>
                        <td> <span id="${_col3ActivitySpanId}"> ${_kpiCol3_Activity}   </span> </td>
                        <td> <span id="${_col4BeginningVolumeSpanId}"> ${_kpiCol4_BeginningVolume} </span> </td>
                        <td> <span id="${_col5InYearSpanId}"> ${_kpiCol5_InYear} </span> </td>
                        <td> <span id="${_col6ClosingBalanceSpanId}"> ${_kpiCol6_ClosingBalance} </span> </td>
                        <td> <input type="text" id="${_col7ActualVolumeTextBoxId}"  maxlength="${_gTextBoxMaxLength}"  class="${_col7ActualVolumeClass} form-control" value="${_kpiCol7_ActualVolume}"  />   </td>
                </tr>
                `;

            $("#" + _kpiSectionTableBodyId).append(_trLine);


        }



    }


}





function ReportTemplate_BuildSheet_AdHocSection(sheetObj, adHocSectionObj) {

    // Addditional KPI => Ad Hoc section has multiple 

    var _adHocSectionDivId = _gSheetAdHocSectionDivPreifx + sheetObj.fltReportSheetID;



    console.log("ReportTemplate_BuildSheet_AdHocSection() sheetID =" + sheetObj.fltReportSheetID + " section ID =" + adHocSectionObj.fltReportSectionID);


    var _adHocSectionName = "";
    if (adHocSectionObj.sectionName != null && adHocSectionObj.sectionName != "") {
        _adHocSectionName = adHocSectionObj.sectionName;
    }

    var _adHocSectionTitle = "";
    if (adHocSectionObj.sectionTitle != null && adHocSectionObj.sectionTitle != "") {
        _adHocSectionTitle = adHocSectionObj.sectionTitle;
        console.log(adHocSectionObj);
        console.log(adHocSectionObj.sectionTitle);
        
    }

    var _sectionName  = "<h4> Additional KPI Section Name: " + _adHocSectionName + "</h4> ";
    var _sectionTitle = "<h4> Additional KPI Section Title: " + _adHocSectionTitle + "</h4>";

    $("#" + _adHocSectionDivId).append(_sectionName);
    $("#" + _adHocSectionDivId).append(_sectionTitle);


    var _maxColNumber = AdHoc_Cells_GetMaxColNumber(adHocSectionObj.fltReportCells);
    // var _maxColNumber_th_colspan = _maxColNumber - parseInt("1"); 

    var _maxRowNumber = AdHoc_Cells_GetMaxRowNumber(adHocSectionObj.fltReportCells);

    console.log("AdHoc Max Row = " + _maxRowNumber + " Max Col = " + _maxColNumber);


    var _adHoc_TableId     = _gAdHoc_TableIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID;
    var _adHoc_TableBodyId = _gAdHoc_TableBodyIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID;
    var _adHoc_TableCalculatorId = _gAdHoc_TableCalculatorIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID;
    var _adHoc_TableCalculatorClass = _gAdHoc_TableCalculatorClassPrefix + sheetObj.fltReportSheetID;

    //Finding longest length
    var _maxLength = 0;
    var _length =0
    for (var i = 1; i <= _maxRowNumber; i++) {
        _length = 0
        for (var j = 0; j < adHocSectionObj.fltReportCells.length; j++) {

            var _cellObj = adHocSectionObj.fltReportCells[j];
            //_maxLength = _maxLength + _cellObj.cellWidth;
            if (i == _cellObj.startRowNo) {
                _length = _length + _cellObj.cellWidth;
            }
        }
        if (_maxLength > 0) {
            _maxLength = _maxLength >= _length ? _maxLength : _length;

        } else {
            _maxLength = _length;
        }
      
    }
    console.log("Max length for this table is: " + _maxLength);

    var _tabbleStr = `<div class="table-responsive">
                <table class="table" id="${_adHoc_TableId}" border="1">
                    <thead>
                        <tr>
                            
                            <th colspan="${_maxLength}">
                             <a id="${_adHoc_TableCalculatorId}"  class="${_adHoc_TableCalculatorClass}  adHocTableCalculatorClass"> <i class="fa fa-calculator pull-right fa-2x"></i> </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="${_adHoc_TableBodyId}">
                    </tbody>
                </table>
            </div>
        `;

    $("#" + _adHocSectionDivId).append(_tabbleStr);

    for (var i = 1; i <= _maxRowNumber; i++) {

        var _tds = "";

        for (var j = 0; j < adHocSectionObj.fltReportCells.length; j++) {

            var _cellObj = adHocSectionObj.fltReportCells[j];
            if (i == _cellObj.startRowNo) {
                var _td_id = _gAdHoc_TdIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID + "_" + i + "_" + _cellObj.startColNo;
                _tds += `<td id="${_td_id}" data-haselement="0"> </td>`;
            }
            
        }
        var _tr = "";
        _tr = `<tr> + ${_tds} + </tr>`;
        $("#" + _adHoc_TableBodyId).append(_tr);
    }



    //    for (var j = 1; j <= _maxColNumber; j++) {
    //        var _td_id = _gAdHoc_TdIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID + "_" + i + "_" + j;
    //        _tds += `<td id="${_td_id}" data-haselement="0"> </td>`;
    //    }
    //    var _tr = "";
    //    _tr = `<tr> + ${_tds} + </tr>`;

    //    $("#" + _adHoc_TableBodyId).append(_tr);
    //}







    //for (var i = 1; i <= _maxRowNumber; i++) {

    //    var _tdLength = 0;
    //    var _tds = "";
    //    for (var j = 1; j <= _maxColNumber; j++) {
    //        var _td_id = _gAdHoc_TdIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID + "_" + i + "_" + j;
    //        _tds += `<td id="${_td_id}" data-haselement="0"> </td>`;
            
    //        _tdLength = _tdLength + adHocSectionObj.fltReportCells[j].cellWidth;
    //        //if (_tdLength = _maxColNumber) {
    //        //    j = _maxColNumber + 1;
    //        //}
    //        console.log("-----> i is : " + i + "J is : " + j + "adHocSectionObj.fltReportCells[j] is: " + adHocSectionObj.fltReportCells[j]);
    //        console.log("-----> here is the Lenghth per cell _tdLength : " + _tdLength);
    //    }
    //    var _tr = "";
    //    _tr = `<tr> + ${_tds} + </tr>`;
       
    //    $("#" + _adHoc_TableBodyId).append(_tr);
    //}

    // append element to td 
    for (var i = 0; i < adHocSectionObj.fltReportCells.length; i++)
    {
        var _cellObj = adHocSectionObj.fltReportCells[i];
        var _tdId = _gAdHoc_TdIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID + "_" + _cellObj.startRowNo + "_" + _cellObj.startColNo;
        var _spanId = _gAdHoc_TdSpanIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID + "_" + _cellObj.startRowNo + "_" + _cellObj.startColNo;
        var _textBoxId = _gAdHoc_IdTextBoxIdPrefix + sheetObj.fltReportSheetID + "_" + adHocSectionObj.fltReportSectionID + "_" + _cellObj.startRowNo + "_" + _cellObj.startColNo;

        var _spanElement = "";
        var _textBoxElement = "";

        var _tdAlignment = "left"; // Left
        var _cellAlignment = "left"; // Left
        if (_cellObj.horizonAlignment == "2") {
            _tdAlignment = "center";
            _cellAlignment = "center";
        } else if (_cellObj.horizonAlignment == "3") {
            _tdAlignment = "right";
            _cellAlignment = "right";
        } else {
            _tdAlignment = "left";
            _cellAlignment = "left"
        }
       


        if (_cellObj.readOnly == true) {

            var _spanTextValue = "";
            if (_cellObj.textValue != null && _cellObj.textValue != "" && _cellObj.textValue != "null") {
                _spanTextValue = _cellObj.textValue;
            }

            if (_cellObj.numericValue != null && _cellObj.numericValue != "" && _cellObj.numericValue != "null") {
                _spanTextValue = _cellObj.numericValue;
            }

            if (_cellObj.decimalValue != null && _cellObj.decimalValue != "" && _cellObj.decimalValue != "null") {
                _spanTextValue = _cellObj.decimalValue;
                if (_cellObj.format == _gDataFormat_Currency) {
                    var tempValue = Report_ConvertDecimalToCurrencyFormat(_spanTextValue);
                   // console.error("tempValue = " + tempValue);
                     _spanTextValue = "$" + tempValue;
                }
            }

            if (_cellObj.dateValue != null && _cellObj.dateValue != "" && _cellObj.dateValue != "null") {
                _spanTextValue = ConvertServerDateStrToMM_DD_YYYY(_cellObj.dateValue)
                
            }


            _spanElement = `<span id="${_spanId}">${_spanTextValue}</span>`;

            $("#" + _tdId).append(_spanElement);

            $("#" + _tdId).attr("data-haselement", "1");
            $("#" + _tdId).attr("data-cellid", _cellObj.fltReportCellID);
            $("#" + _tdId).attr("data-type", _cellObj.dataType);
            $("#" + _tdId).attr("data-readonly", "true");
            $("#" + _tdId).attr("data-format", _cellObj.format);
            $("#" + _tdId).attr("align", _tdAlignment);
            $("#" + _tdId).attr("data-formula", _cellObj.formula);
            $("#" + _tdId).attr("data-sheetid", sheetObj.fltReportSheetID);
            $("#" + _tdId).attr("data-sectionid", adHocSectionObj.fltReportSectionID);
            $("#" + _tdId).attr("data-rowno", _cellObj.startRowNo);
            $("#" + _tdId).attr("data-colno", _cellObj.startColNo);
            $("#" + _tdId).attr("data-sumrequired", _cellObj.sumRequired);
            $("#" + _tdId).attr("colspan", _cellObj.cellWidth);

            console.log("___i is: ____ " + i);

            console.log("=========Read Only==========> _cellObj.cellWidth :" + _cellObj.cellWidth + " -- data-rowno:  ", _cellObj.startRowNo + "  -- data-colno:  ", _cellObj.startColNo );


        } else {
            var _inputTextValue = "";
            if (_cellObj.dataType == _gDataType_Text) {
                if (_cellObj.textValue != null && _cellObj.textValue != "" && _cellObj.textValue != "null") {
                    _inputTextValue = _cellObj.textValue;
                }
            } else if (_cellObj.dataType == _gDataType_Numeric) {

                if (_cellObj.numericValue != null && _cellObj.numericValue != "" && _cellObj.textValue != "null") {
                    _inputTextValue = parseInt( _cellObj.numericValue);
                }
            } else if (_cellObj.dataType == _gDataType_Decimal) {

                if (_cellObj.decimalValue != null && _cellObj.decimalValue != "" && _cellObj.textValue != "null") {
                    _inputTextValue = parseFloat( _cellObj.decimalValue);
                }
            } else if (_cellObj.dataType == _gDataType_Date) {
                if (_cellObj.dateValue != null && _cellObj.dateValue != "" && _cellObj.textValue != "null") {
                    _inputTextValue = ConvertServerDateStrToMM_DD_YYYY(_cellObj.dateValue);
                }

            }

            if (_cellObj.format == _gDataFormat_Currency) {
                var _inputTextValueCurrency = "";
                if (_inputTextValue != null && _inputTextValue != "") {
                    _inputTextValueCurrency = Report_ConvertDecimalToCurrencyFormat(_inputTextValue);
                }
                _textBoxElement = ` <div class="input-group">
                                      <div class="input-group-addon">$</div>
                                      <input type="text" id="${_textBoxId}" class="form-control" value="${_inputTextValueCurrency}" style="text-align:${_cellAlignment}" />
                                    </div>
                                   `;
            }
            else if (_cellObj.format == _gDataFormat_Percentage) {
                _textBoxElement = ` <div class="input-group">
                                         <div class="input-group-addon">%</div>
                                         <input type="text" id="${_textBoxId}" class="form-control" value="${_inputTextValue}" style="text-align:${_cellAlignment}"  />
                                    </div>
                                   `;
            } else if (_cellObj.format == _gDataFormat_Date ) {

                _textBoxElement = ` <div class="input-group date">
                                         <span class="input-group-addon">
                                             <i class="fa fa-calendar"> </i>
                                         </span>
                                         <input type="text" id="${_textBoxId}" class="form-control" value="${_inputTextValue}" style="text-align:${_cellAlignment}" />
                                    </div>
                                   `;
            }
            else {
                _textBoxElement = `<input type="text" id="${_textBoxId}" class="form-control" value="${_inputTextValue}" style="text-align:${_cellAlignment}" />`;
            }


             
            $("#" + _tdId).append(_textBoxElement);
            $("#" + _tdId).attr("data-haselement", "1");
            $("#" + _tdId).attr("data-cellid", _cellObj.fltReportCellID);
            $("#" + _tdId).attr("data-type", _cellObj.dataType);
            $("#" + _tdId).attr("data-readonly", "false");
            $("#" + _tdId).attr("data-format", _cellObj.format);
            $("#" + _tdId).attr("align", _tdAlignment);
            $("#" + _tdId).attr("data-formula", _cellObj.formula);
            $("#" + _tdId).attr("data-sheetid", sheetObj.fltReportSheetID);
            $("#" + _tdId).attr("data-sectionid", adHocSectionObj.fltReportSectionID);
            $("#" + _tdId).attr("data-rowno", _cellObj.startRowNo);
            $("#" + _tdId).attr("data-colno", _cellObj.startColNo);
            $("#" + _tdId).attr("data-sumrequired", _cellObj.sumRequired);
            $("#" + _tdId).attr("colspan", _cellObj.cellWidth);
            console.log("=========Not Read Only==========> _cellObj.cellWidth :" + _cellObj.cellWidth + " -- data-rowno:  ", _cellObj.startRowNo + "  -- data-colno:  ", _cellObj.startColNo);

        }


    }



    RegisterAdHocCellTableCalculatorClickEvent();

}




function ConvertServerDateStrToMM_DD_YYYY(serverDateStr) {
     // serverDateStr: "2022-06-15T14:05:51.463"
    var _date_MM_DD_YYYY = "";
    if (serverDateStr != null && serverDateStr != "") {
        var _splitTParts = serverDateStr.split('T');
        var _dateStr = _splitTParts[0];
        var _dateParts = _dateStr.split('-');
        _date_MM_DD_YYYY = _dateParts[1] + '/' + _dateParts[2] + '/' + _dateParts[0];
    }

    return _date_MM_DD_YYYY;
}


function AdHoc_Cells_GetMaxColNumber(reportCells) {
    var maxColNumber = 1;
    maxColNumber = parseInt(maxColNumber);

    for (var i = 0; i < reportCells.length; i++) {
        var reportCellObj = reportCells[i];
        if (reportCellObj.startColNo != null && reportCellObj.startColNo != "") {
            var tempColNo = parseInt(reportCellObj.startColNo);
            if (tempColNo > maxColNumber) {
                maxColNumber = tempColNo;
            }

        }
    }
    return maxColNumber;
}


function AdHoc_Cells_GetMaxRowNumber(reportCells) {

    var maxRowNumber = 1;
    maxRowNumber = parseInt(maxRowNumber);

    for (var i = 0; i < reportCells.length; i++) {
        var reportCellObj = reportCells[i];
        if (reportCellObj.startRowNo != null && reportCellObj.startRowNo != "") {
            var tempRowNo = parseInt(reportCellObj.startRowNo);
            if (tempRowNo > maxRowNumber) {
                maxRowNumber = tempRowNo;
            }

        }
    }


    return maxRowNumber;
}


function InputTextBox_RegisterDatePicker() {

    $('.input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });
}


function Report_DecimalValidation(input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}


function Report_NumberOnlyValidation(fieldValue) {
    var RE = /^\d+$/;
    return (RE.test(fieldValue));
}

function Report_DateFormatValidation(fieldValue) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20|21)\d{2}$/;

    return date_regex.test(fieldValue);
}


function Report_CurrencyFormatValidation_WithoutDollarSign(fieldValue) {
    // return true, false
    var currency_regex = /^([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
    return currency_regex.test(fieldValue);
}


function Report_ConvertDecimalToCurrencyFormat(decimalAmountValue) {
    var _defaultAmount = "$0.00";
    _defaultAmount = decimalAmountValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return _defaultAmount;
}