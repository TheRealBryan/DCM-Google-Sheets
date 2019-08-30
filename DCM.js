////// UPDATE WITH YOUR DCM REPORT/PROFILE ID & THE GOOGLE SHEETS URL AND TAB NAME ////////////////
                                                                                                  /
var reportId = XXXXXXXXXX;                                                                        /
var profileId = XXXXXXXX;                                                                         /
                                                                                                  /
var SPREADSHEET_URL = 'XXXXXXXXXXXXXX'                                                            /
var TAB_NAME = 'XXXXXXX'                                                                          /
                                                                                                  /
////// DO NOT TOUCH ANYTHING BELOW ////////////////////////////////////////////////////////////////

function DCMdownload() {

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(TAB_NAME);

  var httpOptions = {'headers': {'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()}};       
  var additionalParameters = {'synchronous': 'true'};
  var ReportFile = DoubleClickCampaigns.Reports.run(profileId, reportId, additionalParameters);
  var ReportFileID = (ReportFile.id);
  
  var newReportFile = DoubleClickCampaigns.Files.get(reportId, ReportFileID);
  if(newReportFile.urls) {var httpOptions = {'headers': {'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()}};
  
  var csvContent = UrlFetchApp.fetch(newReportFile.urls.apiUrl, httpOptions).getContentText();
  var csvData = Utilities.parseCsv(csvContent);
  sheet.clearContents().clearFormats();
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
}
