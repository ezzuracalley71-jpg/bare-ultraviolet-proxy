# Bare + UltraViolet Web Proxy

A powerful Node.js web proxy built with **Bare** and **UltraViolet** that allows you to load any website through the proxy.

## Features

✅ Load any website through the proxy  
✅ Bare server for handling HTTP/HTTPS requests  
✅ UltraViolet for URL rewriting and encoding  
✅ CORS enabled for cross-origin requests  
✅ Cookie support  
✅ Simple web interface  

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ezzuracalley71-jpg/bare-ultraviolet-proxy.git
   cd bare-ultraviolet-proxy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the proxy**
   - Open your browser and go to `http://localhost:3000`
   - Enter any website URL to browse through the proxy

## Usage

### Web Interface
1. Open `http://localhost:3000` in your browser
2. Enter the URL you want to visit (e.g., `https://example.com`)
3. Click "Browse" to load the website through the proxy

### Bare API
The Bare server API is available at:
```
http://localhost:3000/bare/api/v1/
```

### UltraViolet Encoding
URLs are encoded using UltraViolet's XOR encoding:
```
/uv/{encoded-url}
```

## Project Structure

```
bare-ultraviolet-proxy/
├── server.js              # Main server file
├── package.json          # Dependencies and scripts
├── README.md             # This file
├── .gitignore            # Git ignore rules
└── public/
    ├── index.html        # Main web interface
    ├── styles.css        # Styling
    └── script.js         # Frontend logic
```

## Configuration

### Port
Change the port by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

### Bare Settings
Edit `server.js` to customize Bare server behavior.

### UltraViolet Settings
Edit `public/script.js` to customize UltraViolet configuration:
```javascript
ultraviolet.init({
    bare: '/bare/api/v1/',
    encodeUrl: 'xor',
    prefix: '/uv/',
    requestHeaders: {
        'User-Agent': '...'
    }
});
```

## How It Works

1. **User Input**: User enters a URL in the web interface
2. **URL Encoding**: UltraViolet encodes the URL using XOR encoding
3. **Request**: Browser makes a request to `/uv/{encoded-url}`
4. **Bare Server**: The Bare server intercepts the request
5. **Proxying**: The request is forwarded to the target server
6. **Response**: The response is returned and decoded by UltraViolet
7. **Rendering**: The website is displayed in the browser

## Security Considerations

⚠️ **Important**: This proxy should only be used for legitimate purposes. Be aware that:
- The proxy may be used to bypass network restrictions
- Always comply with local laws and regulations
- School/workplace networks may have terms of service that prohibit proxy usage
- Use responsibly and ethically

## Dependencies

- **@tomphttp/bare-server-node**: Bare server implementation
- **express**: Web framework
- **cors**: CORS middleware

## License

MIT License - See LICENSE file for details

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
PORT=3001 npm start
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Bare API Not Working
- Ensure the server is running
- Check that `/bare/api/v1/` endpoint is accessible
- Check browser console for errors

## Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ by ezzuracalley71-jpg**
