// Initialize UltraViolet
const ultraviolet = window.ultraviolet;
if (ultraviolet) {
    ultraviolet.init({
        bare: '/bare/api/v1/',
        encodeUrl: 'xor',
        prefix: '/uv/',
        requestHeaders: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    });
}

// Get URL input element
const urlInput = document.getElementById('urlInput');

// Handle Enter key
if (urlInput) {
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            navigateToUrl();
        }
    });
}

// Navigate to URL
function navigateToUrl() {
    let url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    try {
        new URL(url); // Validate URL
        
        // Encode the URL for UltraViolet
        const encodedUrl = ultraviolet.encodeUrl(url);
        
        // Navigate to the encoded URL
        window.location.href = '/uv/' + encodedUrl;
    } catch (error) {
        alert('Invalid URL: ' + error.message);
    }
}

// Handle proxy requests
function handleProxyRequest(url) {
    try {
        const encodedUrl = ultraviolet.encodeUrl(url);
        return '/uv/' + encodedUrl;
    } catch (error) {
        console.error('Error encoding URL:', error);
        return null;
    }
}

// Listen for messages from iframe
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'navigate') {
        const newUrl = event.data.url;
        navigateToUrl.call({ value: newUrl });
    }
});

console.log('✅ Proxy script loaded successfully');
console.log('Bare API endpoint: /bare/api/v1/');
console.log('UltraViolet prefix: /uv/');
