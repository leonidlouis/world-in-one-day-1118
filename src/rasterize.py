"""Rasterize our SVG using the machine's installed librsvg and Cairo."""
import ctypes as C
import ctypes.util
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
rsvg = C.CDLL(ctypes.util.find_library('rsvg-2'))
cairo = C.CDLL(ctypes.util.find_library('cairo'))
gobject = C.CDLL(ctypes.util.find_library('gobject-2.0'))

rsvg.rsvg_handle_new_from_data.argtypes = [C.c_char_p, C.c_size_t, C.c_void_p]
rsvg.rsvg_handle_new_from_data.restype = C.c_void_p
rsvg.rsvg_handle_render_document.argtypes = [C.c_void_p, C.c_void_p, C.c_void_p, C.c_void_p]
rsvg.rsvg_handle_render_document.restype = C.c_int
cairo.cairo_image_surface_create.argtypes = [C.c_int, C.c_int, C.c_int]
cairo.cairo_image_surface_create.restype = C.c_void_p
cairo.cairo_create.argtypes = [C.c_void_p]
cairo.cairo_create.restype = C.c_void_p
cairo.cairo_surface_write_to_png.argtypes = [C.c_void_p, C.c_char_p]
cairo.cairo_surface_write_to_png.restype = C.c_int
cairo.cairo_destroy.argtypes = [C.c_void_p]
cairo.cairo_surface_destroy.argtypes = [C.c_void_p]
gobject.g_object_unref.argtypes = [C.c_void_p]

class Viewport(C.Structure):
    _fields_ = [(k,C.c_double) for k in ['x','y','width','height']]

svg = (root/'build/frontpage.svg').read_bytes()
handle = rsvg.rsvg_handle_new_from_data(svg,len(svg),None)
assert handle, 'SVG parse failed'
surface = cairo.cairo_image_surface_create(0,1024,1024)
context = cairo.cairo_create(surface)
viewport = Viewport(0,0,1024,1024)
assert rsvg.rsvg_handle_render_document(handle,context,C.byref(viewport),None)
assert cairo.cairo_surface_write_to_png(surface,str(root/'build/raw.png').encode()) == 0
cairo.cairo_destroy(context)
cairo.cairo_surface_destroy(surface)
gobject.g_object_unref(handle)

im = Image.open(root/'build/raw.png').convert('RGB')
assert im.size == (1024,1024)
im.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE).save(root/'assets/entry.png',optimize=True)
im.resize((300,300),Image.Resampling.LANCZOS).save(root/'build/preview-300.png')
size = (root/'assets/entry.png').stat().st_size
assert size <= 1048576
print(f'assets/entry.png: {size:,} bytes; 1024 × 1024')
