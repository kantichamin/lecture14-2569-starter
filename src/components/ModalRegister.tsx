import { useState } from "react";

//STEP 1 - 1.0. : การกำหนด Type ด้วย TypeScript (type RegisterForm)
  type RegisterForm = {
    fname: string;
    lname: string;
    plan: string;
    gender: string;
  };
//STEP 2 - 2.0. : ข้อมูล Array สำหรับ dropdown (plans)
  const plans = [
    { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
    { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
    { id: "half", label: "Half Marathon 21 Km", price: 1200 },
    { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
  ];


export default function ModalRegister({ onClose }: { onClose: () => void }) {
  // STEP 1 - 1.1. : การสร้าง State สำหรับเก็บข้อมูลฟอร์ม (useState)
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
  });
  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.1. : การประกาศ State สำหรับคุม Checkbox และ Error (useState)
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });
  // STEP 1 - 1.2. : ฟังก์ชันอัปเดตข้อมูลแบบไดนามิก (updateForm)
  const updateForm = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value })); //...prev คือการ copy ตัวเองก่อน
  };
  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.2. : ระบบยอมรับเงื่อนไขก่อนกดปุ่ม (disabled)
  // STEP 4 : Total Payment (realtime)
  // STEP 4 - 4.1. : ฟังก์ชันคำนวณราคา (computeTotalPayment)
  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;
    return total;
  };
  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.3. : ฟังก์ชันตรวจสอบข้อมูลเมื่อกดปุ่ม (registerBtnOnClick)
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
  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
              {/* STEP 6 : useState คุมการเปิด/ปิด modal เอง */}
              {/* STEP 6 - 6.2. : การสร้างและจัดการ UI Modal */}
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {/* STEP 1 : First name & Last name */}
              <div className="d-flex gap-2">
                <div>
                  <label className="form-label">First name</label>
                  {/* STEP 1 - 1.3. : สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ*/}
                  <input className={`form-control ${errors.fname ? "is-invalid" : ""}`} value={form.fname} onChange={(e) => updateForm("fname", e.target.value)} />
                  {/* STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation  */}
                  {/* STEP 5 - 5.5. : การแสดงสถานะ Error บน Bootstrap Form (is-invalid) */}
                  <div className="invalid-feedback">Invalid first name</div>
                </div>
                <div>
                  <label className="form-label">Last name</label>
                  {/* STEP 1 - 1.4. : สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ*/}
                  <input value={form.lname} onChange={(e) => updateForm("lname", e.target.value)} />
                </div>
              </div>

              {/* STEP 2 : Plan dropdown — เติม .map() วน plans สร้าง <option> (ทุกตัวมี key) */}
              <div className="mt-2">
                <label className="form-label">Plan</label>
                {/* STEP 2 - 2.1 : 2.1 การควบคุม Select element (Controlled Component) & การเรนเดอร์ ตัวเลือก (Option List) */}
                <select
                  className={"form-select" + (errors.plan ? " is-invalid" : "")}
                  onChange={(e) => updateForm("plan", e.target.value)}
                  value={form.plan}
                  >
                  <option value="">Please select..</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price.toLocaleString()} THB)
                    </option>
                  ))}
                </select>
                {/* STEP 5 - 5.6. : สำหรับ Bootstrap Form แสดง Invalid plan */}
                <div className="invalid-feedback">Please select a Plan</div>
              </div>

              {/* STEP 3 : Gender radio — ผูก checked / onChange กับ form.gender */}
              <div className="mt-2">
                <label className="form-label">Gender</label>
                <div>
                  {/*  STEP 3 - 3.1 : การเช็กสถานะการเลือก (checked) & การอัปเดตค่าเมื่อมีการคลิก (onChange) */}
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
                  {/* STEP 5 - 5.7. : สำหรับ Conditional Rendering แยกต่างหาก (เช่น Radio button)*/}
                  { errors.gender && (
                    <div className="text-danger">Please select gender</div>
                  )}
                </div>
              </div>

              {/* STEP 4 : Total Payment (realtime) */}
              {/* STEP 4 - 4.2. : การแสดงผลบน UI (Real-time Rendering) */}
              <div className="mt-3">
                Total Payment : {computeTotalPayment().toLocaleString()} THB
              </div>
            </div>

            <div className="modal-footer">
              {/* STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation  */}
              {/* STEP 5 - 5.4. : การผูก Checkbox และการเปิด/ปิดปุ่ม Register */}
              {/* Terms and conditions */}
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                /> I agree to the terms and conditions
              {/* Register Button */}
              <button
                className="btn btn-success my-2"
                onClick={registerBtnOnClick}
                disabled={!agree}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}
