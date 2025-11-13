<template>
  <footer class="footer">
    <el-container class="container">
      <el-row :gutter="30" class="footer-content">
        <!-- Using el-col for responsive grid layout -->
        <!-- Enhanced About section with logo and description -->
        <el-col :xs="24" :sm="24" :md="24" :lg="7" class="footer-section brand">
          <div class="brand-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="url(#gradient)" />
              <path d="M7 12L10 15L17 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stop-color="#8b5cf6" />
                  <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <h3>caoanh_ng</h3>
          </div>
          <el-text type="info" size="default" class="brand-description">
            Xây dựng giải pháp công nghệ hiện đại, giúp bạn quản lý công việc hiệu quả và tối ưu hóa năng suất mỗi ngày.
          </el-text>
          <div class="contact-info">
            <div class="contact-item">
              <el-icon :size="16" color="#8b5cf6"><Message /></el-icon>
              <el-text size="default">contact@caoanh.dev</el-text>
            </div>
            <div class="contact-item">
              <el-icon :size="16" color="#8b5cf6"><Phone /></el-icon>
              <el-text size="default">+84 123 456 789</el-text>
            </div>
          </div>
        </el-col>

        <!-- Using el-col for navigation sections -->
        <el-col :xs="12" :sm="12" :md="6" :lg="4" class="footer-section">
          <h4>Sản phẩm</h4>
          <ul>
            <li><el-link href="/schedule" :underline="false">My Schedule</el-link></li>
            <li><el-link href="/todo" :underline="false">Todo List</el-link></li>
            <li><el-link href="/projects" :underline="false">Dự án</el-link></li>
            <li><el-link href="/tools" :underline="false">Công cụ</el-link></li>
            <li><el-link href="/pricing" :underline="false">Bảng giá</el-link></li>
          </ul>
        </el-col>

        <el-col :xs="12" :sm="12" :md="6" :lg="4" class="footer-section">
          <h4>Tài nguyên</h4>
          <ul>
            <li><el-link href="/docs" :underline="false">Tài liệu</el-link></li>
            <li><el-link href="/blog" :underline="false">Blog</el-link></li>
            <li><el-link href="/tutorials" :underline="false">Hướng dẫn</el-link></li>
            <li><el-link href="/api" :underline="false">API</el-link></li>
            <li><el-link href="/changelog" :underline="false">Changelog</el-link></li>
          </ul>
        </el-col>

        <el-col :xs="12" :sm="12" :md="6" :lg="4" class="footer-section">
          <h4>Công ty</h4>
          <ul>
            <li><el-link href="/about" :underline="false">Về chúng tôi</el-link></li>
            <li><el-link href="/team" :underline="false">Đội ngũ</el-link></li>
            <li><el-link href="/careers" :underline="false">Tuyển dụng</el-link></li>
            <li><el-link href="/contact" :underline="false">Liên hệ</el-link></li>
            <li><el-link href="/press" :underline="false">Báo chí</el-link></li>
          </ul>
        </el-col>

        <!-- Using el-input and el-button for newsletter -->
        <el-col :xs="24" :sm="24" :md="6" :lg="5" class="footer-section">
          <h4>Kết nối</h4>
          <el-text type="info" size="small" class="newsletter-text">
            Đăng ký nhận cập nhật mới nhất
          </el-text>
          <div class="newsletter">
            <el-input
              v-model="email"
              placeholder="Email của bạn"
              size="default"
              class="newsletter-input"
            >
              <template #suffix>
                <el-button
                  :icon="Right"
                  circle
                  class="subscribe-btn"
                  @click="handleSubscribe"
                />
              </template>
            </el-input>
          </div>
          <div class="social-links">
            <el-link href="https://github.com/caoanh_ng" :underline="false" class="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </el-link>
            <el-link href="https://twitter.com/caoanh_ng" :underline="false" class="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </el-link>
            <el-link href="https://linkedin.com/in/caoanh_ng" :underline="false" class="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </el-link>
            <el-link href="https://facebook.com/caoanh_ng" :underline="false" class="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </el-link>
          </div>
        </el-col>
      </el-row>

      <!-- Using el-divider and el-text for footer bottom -->
      <el-divider class="footer-divider" />

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <el-text type="info" size="default">&copy; 2025 caoanh_ng. All rights reserved.</el-text>
          <div class="footer-links">
            <el-link href="/privacy" :underline="false" type="info" size="small">Privacy Policy</el-link>
            <span class="separator">•</span>
            <el-link href="/terms" :underline="false" type="info" size="small">Terms of Service</el-link>
            <span class="separator">•</span>
            <el-link href="/cookies" :underline="false" type="info" size="small">Cookie Policy</el-link>
          </div>
        </div>
      </div>
    </el-container>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { Message, Phone, Right } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const email = ref('')

const handleSubscribe = () => {
  if (!email.value) {
    ElMessage.warning('Vui lòng nhập email')
    return
  }
  ElMessage.success('Đăng ký thành công!')
  email.value = ''
}
</script>

<style scoped>
/* Updated background with gradient and improved styling */
.footer {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #d1d5db;
  padding: 4rem 0 1.5rem;
  margin-top: 4px;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
  display: block;
}

.footer-content {
  margin-bottom: 3rem;
}

/* Enhanced brand section */
.footer-section.brand {
  padding-right: 1rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.brand-logo h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-description {
  display: block;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Added contact info styling */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-section h4 {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-section h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90px;
  height: 2px;
  background: linear-gradient(90deg, #8b5cf6, #06b6d4);
  border-radius: 2px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

/* Override Element Plus link styles for footer */
.footer-section :deep(.el-link) {
  color: #9ca3af;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.footer-section :deep(.el-link:hover) {
  color: #8b5cf6;
  padding-left: 4px;
}

/* Added newsletter section */
.newsletter-text {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.newsletter {
  margin-bottom: 1.5rem;
}

/* Custom styling for Element Plus input in newsletter */
.newsletter :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: none;
  padding-right: 2px;
}

.newsletter :deep(.el-input__wrapper:hover) {
  box-shadow: none;
}

.newsletter :deep(.el-input__wrapper.is-focus) {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  box-shadow: none;
}

.newsletter :deep(.el-input__inner) {
  color: white;
  font-size: 0.875rem;
}

.newsletter :deep(.el-input__inner::placeholder) {
  color: #6b7280;
}

/* Custom styling for subscribe button */
.subscribe-btn {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  border: none;
  color: white;
  transition: all 0.3s;
}

.subscribe-btn:hover {
  transform: translateX(2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.social-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Enhanced social icon styling */
.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #d1d5db;
  transition: all 0.3s;
  text-decoration: none;
}

.social-icon:hover {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  border-color: transparent;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}

/* Custom divider styling */
.footer-divider {
  margin: 0;
  border-color: rgba(255, 255, 255, 0.1);
}

/* Enhanced footer bottom */
.footer-bottom {
  padding-top: 2rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.footer-links :deep(.el-link:hover) {
  color: #8b5cf6;
}

.footer-links .separator {
  color: #4b5563;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }

  .container {
    padding: 0 1rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-section {
    margin-bottom: 2rem;
  }
}
</style>
