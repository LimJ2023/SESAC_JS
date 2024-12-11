let selectedProduct = null;
let selectedPaymentMethod = null;
const customerKey = generateRandomString(); // 랜덤고객
const clientKey = "test_ck_Gv6LjeKD8aKEGGy6eWnwVwYxAdXy";
const tossPayments = TossPayments(clientKey); // 토스 객체 초기화
const payment = tossPayments.payment({ customerKey }); //토스 함수 호출

function selectProduct(e, name, price) {
  selectedProduct = { name, price };
  document.querySelectorAll(".product-button").forEach((button) => {
    button.style.backgroundColor = "#ffffff";
  });
  e.target.style.backgroundColor = "rgb(229 239 255)";
}

function selectPaymentMethod(method) {
  if (selectedPaymentMethod) {
    document.getElementById(selectedPaymentMethod).style.backgroundColor =
      "#ffffff";
  }
  selectedPaymentMethod = method;
  document.getElementById(selectedPaymentMethod).style.backgroundColor =
    "rgb(229, 239, 255)";
}

async function requestPayment() {
  if (!selectedProduct) {
    alert("상품선택해주세요.");
    return;
  }
  if (!selectedPaymentMethod) {
    alert("결제방법을 선택해주세요.");
    return;
  }

  const { name, price } = selectedProduct;
  const orderId = generateRandomString();

  try {
    await payment.requestPayment({
      method: selectedPaymentMethod,
      amount: { currency: "KRW", value: price },
      orderId: orderId,
      orderName: name,
      successUrl: `${window.location.origin}/success.html`,
      failUrl: `${window.location.origin}/fail.html`,
    });
  } catch (error) {
    alert(`결제 요청 중 오류가 발생했습니다. ${error.message}`);
  }
}

function generateRandomString() {
  return Math.random().toString(36).slice(2, 10); // 8자리 랜덤문자 6~64사이충족하는 조건 완료
}
