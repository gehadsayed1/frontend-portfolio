# إعداد الشيت وتنسيقه (إضافة العناوين + التصميم)

هذا الكود سيقوم بأمرين:

1. يكتب لكِ عناوين الأعمدة (Timestamp, Name, Email, Message) في الصف الأول تلقائياً.
2. يلون وينسق الجدول ليصبح شكله جميلاً.

## الخطوات:

1. افتحي **Extensions** > **Apps Script** في جوجل شيت.
2. امسحي الكود القديم الموجود في `Editor` وضعي هذا الكود مكانه (لأنه شامل لكل شيء):

```javascript
function setupAndStyleSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // === 1. إضافة العناوين (Headers) ===
  // نحدد أسماء الأعمدة التي نريدها
  var headers = [["Timestamp", "Name", "Email", "Message", "Source"]];

  // نكتب هذه العناوين في الصف الأول (من العمود 1 إلى 5)
  var headerRange = sheet.getRange(1, 1, 1, 5);
  headerRange.setValues(headers);

  // === 2. تجميل الرأس (Styling) ===
  headerRange.setBackground("#6366f1"); // لون "لافندر" غامق (Indigo)
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(12);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  // نكبر ارتفاع الصف الأول قليلاً
  sheet.setRowHeight(1, 50);

  // === 3. تجميد العناوين ===
  // عشان لما تنزلي تحت، العناوين تفضل ظاهرة فوق
  sheet.setFrozenRows(1);

  // === 4. ضبط عرض الأعمدة ===
  sheet.setColumnWidth(1, 160); // التاريخ
  sheet.setColumnWidth(2, 180); // الاسم
  sheet.setColumnWidth(3, 220); // الإيميل
  sheet.setColumnWidth(4, 350); // الرسالة
  sheet.setColumnWidth(5, 150); // المصدر

  // === 5. تنسيق النصوص في الجدول كله ===
  var fullRange = sheet.getDataRange();
  fullRange.setVerticalAlignment("middle");
  fullRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP); // التفاف النص لو طويل

  // رسالة نجاح
  Browser.msgBox("✨ تم إضافة العناوين وتنسيق الجدول بنجاح!");
}
```

3. اضغطي **Save** (أيقونة الديسك).
4. تأكدي أن اسم الدالة `setupAndStyleSheet` مختار في الأعلى.
5. اضغطي **Run**.

الآن ارجعي للشيت، ستجدين العناوين (Headers) موجودة ومنسقة بشكل جميل!
