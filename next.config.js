module.exports = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://bookbuzz.inloya.com/api/v1/:path*'
            }
        ]
    }
}
