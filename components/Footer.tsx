export function Footer() {
  return (
    <footer className="border-t bg-gray-50 text-gray-600">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold text-lg text-blue-600">HotelNexus</p>
            <p className="text-sm">Modern Management for Modern Hotels.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Contact Support</a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} HotelNexus Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}