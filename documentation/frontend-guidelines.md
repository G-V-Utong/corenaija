# 🎨 CoreNaija - Frontend Design Guidelines

This document provides detailed guidelines for building a consistent and user-friendly UI for the CoreNaija app. A cohesive and well-thought-out design ensures trust with users, improving retention and satisfaction. It includes UI principles, color palettes, fonts, icons, and other design components to guide the development of the app's frontend.

---

## ✨ Design Principles

### 1. **User-Centered Design (UCD)**
   - Focus on the needs and preferences of the user.
   - Every design decision should prioritize user comfort and ease of use.
   - Implement intuitive navigation and minimal user effort to achieve tasks.

### 2. **Consistency**
   - Maintain uniformity across all screens and components.
   - Ensure that color schemes, typography, and layouts follow a standardized pattern.
   - Use consistent buttons, forms, inputs, and icons across the app.

### 3. **Simplicity**
   - Minimize the number of elements on any given screen.
   - Avoid unnecessary text, buttons, and distractions.
   - Prioritize clarity and ease of interaction, especially for new users.

### 4. **Accessibility**
   - Ensure the app is usable for people with disabilities.
   - Provide support for screen readers, color blindness modes, and easily readable text.
   - Use high contrast text, proper spacing, and ensure touch targets are large enough for easy navigation.

### 5. **Mobile-First Design**
   - Design with mobile usage in mind as the core experience.
   - Focus on delivering fast load times, simple interactions, and responsive design for smaller screens.
   - Optimize images, components, and animations for mobile devices first, before scaling up to tablets and desktops.

### 6. **Feedback and Microinteractions**
   - Provide clear, immediate feedback for user actions (e.g., button presses, form submissions, etc.).
   - Use animations or subtle transitions for actions like submitting a form or switching between screens to make the app feel alive.
   - Ensure every touchpoint has a visual cue (loading state, success message, etc.).

---

## 🎨 Color Palettes

The CoreNaija color palette is carefully chosen to represent the brand and offer users an engaging, energetic, and calming experience while maintaining professionalism.

### **Primary Colors**
- **Core Green** (Brand Color): #006F3C
   - Represents health, wellness, and energy.
   - Used for primary call-to-action buttons, highlights, and major branding elements.
  
- **Sky Blue**: #00A9E0
   - Represents trust and peace.
   - Used for secondary buttons, links, and highlights.

### **Secondary Colors**
- **Warm Yellow**: #F2C94C
   - Adds warmth and vibrance.
   - Used for notifications, attention-grabbing elements, or sections requiring focus.

- **Deep Red**: #D64F4F
   - Used for error messages or important warnings.

### **Neutral Colors**
- **Light Gray**: #F4F6F9
   - Light background color, used as the app's primary background.
  
- **Dark Gray**: #353535
   - Used for text that requires high readability.

- **Off-White**: #FFFFFF
   - For text, form backgrounds, and some buttons.

### **Accent Colors**
- **Light Green**: #A4D96C
   - Used for success messages and indicators.

### Example Color Usage:
- **Background**: Light Gray (#F4F6F9)
- **Primary Button**: Core Green (#006F3C)
- **Secondary Button**: Sky Blue (#00A9E0)
- **Error Messages**: Deep Red (#D64F4F)
- **Links & Highlights**: Sky Blue (#00A9E0)

---

## 🖋️ Fonts

### **Primary Font**: **Inter**
   - A clean, modern sans-serif typeface that is highly legible at various sizes.
   - **Usage**: Headings, body text, and buttons.

### **Secondary Font**: **Poppins**
   - A rounded sans-serif typeface that is friendly and approachable.
   - **Usage**: Used for accents, tags, and other secondary elements.

### **Font Weights & Sizes**
   - **Heading 1**: Inter, 32px, Bold
   - **Heading 2**: Inter, 24px, Semi-Bold
   - **Body Text**: Inter, 16px, Regular
   - **Subtext / Labels**: Inter, 14px, Regular
   - **Buttons**: Poppins, 16px, Medium

### **Font Colors**
   - **Primary Text**: Dark Gray (#353535)
   - **Secondary Text**: Light Gray (#A0A0A0)
   - **Heading Text**: Core Green (#006F3C)
   - **Links**: Sky Blue (#00A9E0)

### **Text Styling**
   - Avoid using more than two fonts in the app to maintain visual harmony.
   - Text should be legible with proper line height (1.5x for paragraphs).
   - Use appropriate contrast ratios to ensure readability.

---

## 🖼️ Icons & Visuals

### **Icon Style**
   - Use **minimalistic, flat icons** for a modern and clean appearance.
   - Icons should be **consistent in size** and aligned with text labels where necessary.
   - Prefer **outline icons** for general UI elements and **filled icons** for actions or call-to-action buttons.

### **Icon Library**: **Font Awesome** or **Material Icons**
   - These icon sets provide a wide variety of icons that are widely recognized, consistent, and customizable.
   - Use React Native vector icons for consistent icon appearance across the app.

   **Installation**:
   ```bash
   npm install react-native-vector-icons
