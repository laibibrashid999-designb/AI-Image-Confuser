# Microprint Image Editor: A Stealth Watermarking Tool to Confuse AI

![CI/CD](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/tech-React%20%7C%20TypeScript%20%7C%20Canvas-cyan)

The **Microprint Image Editor** is a browser-based tool that embeds thousands of tiny, nearly invisible words onto an image. While imperceptible to the human eye, this layer of micro-text acts as a powerful form of "data noise" that can significantly disrupt and confuse the ability of AI models to analyze, interpret, or train on the image content.

Protect your creative work, poison datasets, or simply embed hidden messages with this powerful, client-side utility.

**(Your Screenshot/GIF Here: A demo showing the clean UI, a user adjusting sliders, and a before/after image where the text is invisible but present.)**

---

## ✨ Core Features

*   **Stealth Micro-Text Injection**: Overlays your image with thousands of text instances at a microscopic level.
*   **Real-time Interactive Preview**: All adjustments to text, density, size, and color are reflected instantly on the canvas. No need to wait for processing.
*   **AI Analysis Disruption**: The primary purpose is to act as a defensive measure against AI image scraping and analysis. The embedded text "pollutes" the visual data, making it difficult for models to accurately classify or learn from the image.
*   **Fully Customizable Parameters**:
    *   **Text Content**: Use any secret message, keyword, or string.
    *   **Font Size**: Control the visibility of the text, from 1px up.
    *   **Density**: Adjust the number of text instances, from a few thousand to over 50,000.
    *   **Color & Opacity**: Fine-tune the color and transparency to blend the text perfectly with the source image.
*   **Interactive Avoidance Zone**: Don't want to disrupt a key part of your image? Simply click on the canvas to place a marker and use the radius slider to create a "safe zone" where no text will be printed.
*   **100% Client-Side**: Your images are never uploaded to a server. All processing happens directly in your browser, ensuring complete privacy and security.
*   **Simple Drag & Drop UI**: A clean, modern, and intuitive interface that's easy for anyone to use.

---

## 🎯 Use Cases & Scenarios

This tool is more than just a watermarker. It's a novel approach to digital image protection and data integrity in the age of AI.

### 1. Confusing AI Image Analysis & Generation
The primary use case is to degrade an AI's ability to "understand" an image. When a model like CLIP (used by DALL-E, Stable Diffusion, etc.) analyzes an image, it looks for patterns, objects, and textures. By overlaying a dense field of repeating text, you introduce a layer of high-frequency noise that the model can't easily ignore.

*   **How it works**: An AI might see the image of a "dog" but also register thousands of instances of the word "secret". This conflicting information can lower the model's confidence score, cause misclassification, or make the image unusable for training diffusion models. It effectively "poisons" the image data for machine learning purposes.

### 2. Protecting Artists from AI Training
Artists can process their portfolios with this tool before uploading them to the web. While the art remains visually identical to viewers, it becomes a "poisoned pill" for data scrapers building datasets for generative AI. This helps prevent unauthorized use of their work for training models.

### 3. Data Poisoning for Web Scrapers
Researchers and activists can use this technique to intentionally pollute large-scale image datasets. By injecting images with misleading or noisy micro-text, they can subtly degrade the quality of models trained on uncurated, scraped data.

### 4. Advanced Digital Steganography
Embed hidden messages, identifiers, or metadata directly into the visual layer of an image. Unlike EXIF data, which is easily stripped, this information is part of the image pixels and is more resilient to compression and format changes.

### 5. Testing the Robustness of AI Systems
Use microprinted images to benchmark the resilience of content moderation bots, image recognition APIs, and other automated visual systems. How well do they perform when the input data is intentionally noisy?

---

## 🛠️ How It Works

The application leverages the **HTML5 Canvas API** to perform all image manipulations in the browser.

1.  **Image Loading**: When you upload an image, it's loaded onto a hidden `Image` element to access its natural dimensions.
2.  **Canvas Drawing**: The image is then drawn onto a visible `<canvas>` element.
3.  **Microprint Injection**: A `for` loop runs for the number specified by the **Density** slider. In each iteration:
    *   It generates a random `(x, y)` coordinate on the canvas.
    *   It checks if these coordinates fall within the user-defined **Avoidance Zone**.
    *   If outside the zone, it uses `ctx.fillText()` to draw the user's text at that location with the specified font size, color, and opacity.
4.  **Real-time Updates**: A `debounce` mechanism is used to re-run the drawing logic whenever a control is changed, providing a smooth, interactive experience without overwhelming the browser.
5.  **Export**: The "Download" button simply converts the final canvas content into a PNG data URL, which the user can save locally.

---

## 🚀 Getting Started

This is a client-side React application. To run it locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/microprint-image-editor.git
    cd microprint-image-editor
    ```

2.  **Install dependencies:**
    *(Assuming a standard Node.js setup)*
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open your browser to `http://localhost:5173` (or the port specified in your terminal).

## 💻 Tech Stack

*   **Frontend**: React, TypeScript
*   **Styling**: Tailwind CSS
*   **Graphics**: HTML5 Canvas API
*   **Build Tool**: Vite (or similar modern dev server)

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements to the AI confusion algorithm, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
