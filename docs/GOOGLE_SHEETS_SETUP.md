# 📊 دليل إعداد Google Sheets - خطوة بخطوة

## 🎯 نظرة عامة

تم تحديث نموذج الاتصال ليرسل البيانات مباشرة إلى **Google Sheets** بدلاً من EmailJS!

### ✅ المميزات:

- 🆓 **مجاني 100%** - بدون أي حدود!
- ♾️ **Unlimited submissions** - استقبلي رسائل لا محدودة
- 📊 **منظم** - كل الرسائل في جدول واحد
- 📧 **إشعارات** - يمكنك إضافة إشعار إيميل تلقائي
- 🔒 **آمن** - بياناتك في حسابك الخاص

---

## 📝 الخطوات (10 دقائق)

### 1️⃣ إنشاء Google Sheet جديد

1. اذهبي إلى: **https://sheets.google.com/**
2. اضغطي **"+ Blank"** لإنشاء sheet جديد
3. سمّيه: **"Portfolio Contact Messages"**
4. في الصف الأول، أضيفي العناوين التالية:

| A         | B    | C     | D       | E      |
| --------- | ---- | ----- | ------- | ------ |
| Timestamp | Name | Email | Message | Source |

---

### 2️⃣ فتح Apps Script Editor

1. في Google Sheet، اضغطي على **Extensions** (الإضافات)
2. اختاري **Apps Script**
3. سيفتح محرر الكود

---

### 3️⃣ نسخ الكود التالي

احذفي أي كود موجود والصقي هذا الكود:

```javascript
// Google Apps Script لاستقبال بيانات نموذج الاتصال

function doPost(e) {
  try {
    // الحصول على البيانات المرسلة
    const data = JSON.parse(e.postData.contents);

    // فتح الـ Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // إضافة صف جديد بالبيانات
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.message || "",
      data.source || "Unknown",
    ]);

    // إرسال رد نجاح
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // في حالة حدوث خطأ
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// للاختبار
function doGet(e) {
  return ContentService.createTextOutput(
    "Google Sheets Contact Form is working! ✅"
  ).setMimeType(ContentService.MimeType.TEXT);
}
```

---

### 4️⃣ حفظ ونشر الـ Script

1. **احفظي المشروع**:

   - اضغطي على أيقونة **💾 Save** (أو Ctrl+S)
   - سمّيه: **"Portfolio Contact Form Handler"**

2. **انشري كـ Web App**:

   - اضغطي على **Deploy** (نشر) → **New deployment**
   - اضغطي على أيقونة الترس ⚙️ → اختاري **Web app**
   - املئي البيانات:
     - **Description**: Portfolio Contact Form
     - **Execute as**: **Me** (أنت)
     - **Who has access**: **Anyone** (أي شخص)
   - اضغطي **Deploy** (نشر)

3. **امنحي الأذونات**:

   - اضغطي **Authorize access**
   - اختاري حسابك
   - اضغطي **Advanced** → **Go to [project name] (unsafe)**
   - اضغطي **Allow**

4. **انسخي الـ URL**:
   - بعد النشر، سيظهر **Web app URL**
   - انسخيه! سيكون شكله:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

### 5️⃣ تحديث الكود في المشروع

افتحي `src/components/ContactSection.vue` وحدّثي هذا السطر:

```typescript
const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
```

**استبدليه بـ:**

```typescript
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

---

### 6️⃣ اختبار النموذج

1. شغّلي المشروع: `npm run dev`
2. اذهبي لقسم Contact
3. املئي النموذج واضغطي "Send Message"
4. افتحي Google Sheet - يجب أن تظهر البيانات! 🎉

---

## 🎨 تحسينات اختيارية

### ✉️ إضافة إشعار إيميل تلقائي

أضيفي هذا الكود في Apps Script بعد `sheet.appendRow(...)`:

```javascript
// إرسال إشعار إيميل
MailApp.sendEmail({
  to: "your.email@gmail.com", // ضعي إيميلك هنا
  subject: "📧 New Contact Form Message from " + data.name,
  body: `
New message received from your portfolio!

From: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
Sent at: ${new Date().toLocaleString()}
  `,
});
```

---

### 📊 تنسيق الـ Sheet

لجعل الـ Sheet أجمل:

1. **تنسيق الهيدر**:

   - حددي الصف الأول
   - اجعليه **Bold**
   - لون الخلفية: **Lavender** أو **Purple**
   - لون النص: **White**

2. **تجميد الصف الأول**:

   - View → Freeze → 1 row

3. **ضبط عرض الأعمدة**:

   - اضغطي مرتين على الحد بين الأعمدة للضبط التلقائي

4. **إضافة Filters**:
   - حددي الهيدر → Data → Create a filter

---

### 🔔 إشعارات فورية (Telegram/Discord)

يمكنك إضافة إشعارات لـ Telegram أو Discord:

**مثال Telegram:**

```javascript
function sendTelegramNotification(data) {
  const botToken = "YOUR_BOT_TOKEN";
  const chatId = "YOUR_CHAT_ID";
  const message = `🔔 New Contact Form Message!\n\nFrom: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`;

  UrlFetchApp.fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "post",
    payload: {
      chat_id: chatId,
      text: message,
    },
  });
}
```

---

## 📊 عرض البيانات

### الأعمدة في Google Sheet:

| Column        | Description       | Example                  |
| ------------- | ----------------- | ------------------------ |
| **Timestamp** | وقت إرسال الرسالة | 2026-01-06T20:30:00.000Z |
| **Name**      | اسم المرسل        | John Doe                 |
| **Email**     | إيميل المرسل      | john@example.com         |
| **Message**   | نص الرسالة        | Hi! I love your work...  |
| **Source**    | مصدر الرسالة      | Portfolio Contact Form   |

---

## 🔒 الأمان والخصوصية

### ✅ آمن تماماً:

- البيانات في حسابك الخاص
- لا أحد يستطيع الوصول إلا أنت
- الـ URL مشفر ومعقد

### 🛡️ نصائح أمان:

1. **لا تشاركي الـ URL** مع أحد
2. **فعّلي 2FA** على حساب Google
3. **راجعي الرسائل** بانتظام

---

## 🐛 استكشاف الأخطاء

### المشكلة: "Script function not found: doPost"

**الحل**: تأكدي من:

1. نسخ الكود كاملاً
2. حفظ المشروع
3. إعادة النشر

### المشكلة: البيانات لا تظهر في Sheet

**الحل**: تأكدي من:

1. الـ URL صحيح في الكود
2. الأذونات ممنوحة
3. الـ Sheet مفتوح

### المشكلة: "Authorization required"

**الحل**:

1. أعيدي النشر
2. امنحي الأذونات مرة أخرى

---

## 📈 إحصائيات ومتابعة

يمكنك إضافة formulas في Google Sheets:

**عدد الرسائل:**

```
=COUNTA(B:B)-1
```

**آخر رسالة:**

```
=MAX(A:A)
```

**عدد الرسائل اليوم:**

```
=COUNTIF(A:A,">="&TODAY())
```

---

## 🎯 مثال على البيانات

بعد استقبال 3 رسائل، سيبدو الـ Sheet هكذا:

| Timestamp            | Name         | Email            | Message            | Source                 |
| -------------------- | ------------ | ---------------- | ------------------ | ---------------------- |
| 2026-01-06T20:30:00Z | John Doe     | john@example.com | Hi! Love your work | Portfolio Contact Form |
| 2026-01-06T21:15:00Z | Jane Smith   | jane@example.com | Let's collaborate  | Portfolio Contact Form |
| 2026-01-06T22:00:00Z | Mike Johnson | mike@example.com | Great portfolio!   | Portfolio Contact Form |

---

## ✨ المميزات النهائية

✅ **مجاني 100%** - بدون أي تكلفة  
✅ **Unlimited** - بدون حدود  
✅ **منظم** - كل شيء في مكان واحد  
✅ **سهل** - إعداد في 10 دقائق  
✅ **آمن** - بياناتك محمية  
✅ **مرن** - يمكنك إضافة أي ميزة

---

## 🎉 مبروك!

الآن نموذج الاتصال يعمل ويحفظ كل الرسائل في Google Sheets! 🚀

---

**الخطوة التالية:** اتبعي الخطوات أعلاه وابدئي باستقبال الرسائل!

تم إنشاء هذا الدليل بواسطة Antigravity 💜
