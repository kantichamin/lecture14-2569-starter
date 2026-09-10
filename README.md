# lectuer14-starter : Marathon Form - React 3 — useState(hook) . Conditional Rendering 

---

## เริ่มต้น

หลังจากการ Fork และ Clone repository แล้ว, ให้เปิดโฟลเดอร์ด้วย VSCode และรันคำสั่งใน terminal:

```bash
pnpm install
pnpm run dev
```

---

## STEP 1 — ฟอร์มเป็น object + controlled input

`src/components/ModalRegister.tsx`

```tsx
//1.0.การกำหนด Type ด้วย TypeScript (type RegisterForm)
type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
};
```

```tsx
//1.1. การสร้าง State สำหรับเก็บข้อมูลฟอร์ม (useState)
const [form, setForm] = useState<RegisterForm>({
  fname: "",
  lname: "",
  plan: "",
  gender: "",
});
```

```tsx
//1.2. ฟังก์ชันอัปเดตข้อมูลแบบไดนามิก (updateForm)
const updateForm = (key: keyof RegisterForm, value: string) => {
  setForm((prev) => ({ ...prev, [key]: value }));
};
```

```tsx
//1.3. สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ
<input value={form.fname} onChange={(e) => updateForm("fname", e.target.value)} />
//1.4. สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ
<input value={form.lname} onChange={(e) => updateForm("lname", e.target.value)} />
```

## STEP 2 — Plan dropdown ด้วย `.map()`

`src/component/ModalRegister.tsx` — ใน `<select>` เติม `.map()` วน `plans`

```tsx
//2.0. ข้อมูล Array สำหรับ dropdown (plans)
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
```

```tsx
//2.1 การควบคุม Select element (Controlled Component) & การเรนเดอร์ ตัวเลือก (Option List)
<select
  className="form-select"
  value={form.plan}
  onChange={(e) => updateForm("plan", e.target.value)}
>
  <option value="">Please select..</option>
  {plans.map((p) => (
    <option key={p.id} value={p.id}>
      {p.label} ({p.price.toLocaleString()} THB)
    </option>
  ))}
</select>
```

## STEP 3 — Gender radio

`src/component/ModalRegister.tsx` — ผูก `checked` / `onChange` ของ radio ทั้งสองกับ `form.gender`

```tsx
//3.1 การเช็กสถานะการเลือก (checked) & การอัปเดตค่าเมื่อมีการคลิก (onChange)
<div>
  <input
    className="me-2 form-check-input"
    type="radio"
    checked={form.gender === "male"}
    onChange={() => updateForm("gender", "male")}
  />
  Male 👨
  <input
    className="mx-2 form-check-input"
    type="radio"
    checked={form.gender === "female"}
    onChange={() => updateForm("gender", "female")}
  />
  Female 👩
</div>
```

## STEP 4 — Total Payment (realtime)

`src/component/ModalRegister.tsx`

```tsx
//4.1. ฟังก์ชันคำนวณราคา (computeTotalPayment)
const computeTotalPayment = () => {
  let total = 0;
  const selectedPlan = plans.find((p) => p.id === form.plan);
  if (selectedPlan) total += selectedPlan.price;
  return total;
};
```

```tsx
//4.2. การแสดงผลบน UI (Real-time Rendering)
<div className="mt-3">
  Total Payment : {computeTotalPayment().toLocaleString()} THB
</div>
```

## STEP 5 — Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation

`src/component/ModalRegister.tsx`

```tsx
//5.1. การประกาศ State สำหรับคุม Checkbox และ Error (useState)
const [agree, setAgree] = useState(false);

const [errors, setErrors] = useState({
  fname: false,
  lname: false,
  plan: false,
  gender: false,
});
```

```tsx
//5.2. การอัปเดตฟอร์มพร้อมล้างสถานะ Error
const updateForm = (key: keyof RegisterForm, value: string) => {
  setForm((prev) => ({ ...prev, [key]: value }));
  setErrors((prev) => ({ ...prev, [key]: false }));
};
```

```tsx
//5.3. ฟังก์ชันตรวจสอบข้อมูลเมื่อกดปุ่ม (registerBtnOnClick)
const registerBtnOnClick = () => {
  const newErrors = {
    fname: form.fname === "",
    lname: form.lname === "",
    plan: form.plan === "",
    gender: form.gender === "",
  };
  setErrors(newErrors);

  const hasError = Object.values(newErrors).some((isError) => isError);
  if (hasError) return;

  const total = computeTotalPayment();
  alert(
    `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
  );
};
```

```tsx
//5.4. การผูก Checkbox และการเปิด/ปิดปุ่ม Register
<input
type="checkbox"
checked={agree}
onChange={(e) => setAgree(e.target.checked)}
/> I agree to the terms and conditions

<button
className="btn btn-success my-2"
onClick={registerBtnOnClick}
disabled={!agree}>
 Register
</button>
```

```tsx
//5.5. การแสดงสถานะ Error บน Bootstrap Form (is-invalid)
 <input
className={`form-control ${errors.fname ? "is-invalid" : ""}`}
onChange={(e) => updateForm("fname", e.target.value)}
value={form.fname}
/>

<div className="invalid-feedback">Invalid first name</div>
```

```tsx
//5.6. สำหรับ Bootstrap Form แสดง Invalid plan
<select
  className={"form-select" + (errors.plan ? " is-invalid" : "")}
  onChange={(e) => updateForm("plan", e.target.value)}
  value={form.plan}
  >
<div className="invalid-feedback">Please select a Plan</div>
```

```tsx
//5.7. สำหรับ Conditional Rendering แยกต่างหาก (เช่น Radio button)
{
  errors.gender && <div className="text-danger">Please select gender</div>
}
```

## STEP 6 — useState คุมการเปิด/ปิด modal เอง

`src/pages/HomePage.tsx`

```tsx
//6.1. useState คุมการแสดง modal เริ่มที่ false (ปิดอยู่)
const [showModal, setShowModal] = useState(false);
```

`src/component/ModalRegister.tsx`

```tsx
//6.2. การสร้างและจัดการ UI Modal
<div className="modal fade show d-block" tabIndex={-1} role="dialog">
<button type="button" className="btn-close" onClick={onClose}></button>
```

```tsx
//6.3. ฉากหลังสีดำทึบแสง (Backdrop) ด้านล่างสุด
<div className="modal-backdrop fade show"></div>
```

```tsx
//6.4. การรับ Props (Props Destructuring)
export default function ModalRegister({ onClose }: { onClose: () => void }) {}
```

`src/pages/HomePage.tsx`

```tsx
//6.5. การส่ง Prop onClose เพื่อสั่งปิด
{
  showModal && <ModalRegister onClose={() => setShowModal(false)} />
}
```

(ไม่ใช้ `data-bs-toggle` ของ Bootstrap เพราะ backdrop มักค้าง)
