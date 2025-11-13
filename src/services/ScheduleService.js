import { ElMessage } from 'element-plus';
import axios from 'axios'

const BASE_URL = 'http://localhost:8088/api/v1';
const API_URL = '/schedules';

const apiClient = axios.create({
  baseURL: BASE_URL + API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

apiClient.interceptors.request.use(config => {
  config.headers['Accept-Language'] = localStorage.getItem('LANG') || 'vi'
  return config
})

// === SỬA "LÍNH GÁC CỔNG" (INTERCEPTOR) ===
apiClient.interceptors.response.use(

  (response) => {
    // === "LOGIC MỞ HỘP" (UNBOXING) MỚI ===
    // "Kiểm tra" (Check) xem "data" (phản hồi) "có phải" (is) "hộp" (wrapper) "chuẩn" (standard) của bro không
    if (response.data && response.data.status === 200) {
      // 1. "Thành công" (Success) ➔ Chỉ "trả" (return) "cái lõi" (core) (data.data)
      return response.data;
    }

    // (Nếu BE "trả" (return) "thẳng" (direct) data (không "hộp"),
    // thì "trả" (return) "thẳng" (direct) data)
    return response.data;
  },

  (error) => {
    // (Phần "xử lý" (handle) "lỗi" (error) "giữ nguyên" (remains the same))
    console.error('Lỗi API từ Interceptor:', error);
    let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại.';

    if (error.response) {
      // "LỖI CÓ PHẢN HỒI" (4xx, 5xx)
      // (Thử "đọc" (read) "lỗi" (error) "bên trong" (inside) "hộp" (wrapper) "ResponseData" của bro)
      errorMessage = error.response.data.message || `Lỗi ${error.response.status}`;
    } else if (error.request) {
      // "LỖI YÊU CẦU" (Mạng)
      errorMessage = 'Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng.';
    }

    ElMessage.error(errorMessage);
    return Promise.reject(error);
  }
);


export default {
  getSchedulesByDate(date) {
    return apiClient.get('/all', {
      params: { scheduleDate: date }
    });
  },

  createSchedule(scheduleData) {
    return apiClient.post('', scheduleData);
  },

  updateSchedule(id, scheduleData) {
    return apiClient.put(`/${id}`, scheduleData);
  },

  deleteSchedule(id) {
    return apiClient.delete(`/${id}`);
  },
};
