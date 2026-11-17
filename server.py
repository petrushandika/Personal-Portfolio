"""Loopback-only static preview with byte-range support for local videos."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os,re
ROOT=Path(__file__).parent/os.environ.get('STATIC_ROOT','out')
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def end_headers(self):
        self.send_header('Referrer-Policy','no-referrer')
        super().end_headers()
    def send_head(self):
        target=Path(self.translate_path(self.path)).resolve()
        if not target.is_relative_to(ROOT.resolve()):self.send_error(403);return None
        value=self.headers.get('Range')
        if value and target.is_file():
            size=target.stat().st_size;m=re.fullmatch(r'bytes=(\d+)-(\d*)',value)
            if not m:self.send_error(416);return None
            start=int(m[1]);end=min(int(m[2]) if m[2] else size-1,size-1)
            if start>end:self.send_error(416);return None
            self.send_response(206);self.send_header('Content-Type',self.guess_type(str(target)))
            self.send_header('Accept-Ranges','bytes');self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
            self.send_header('Content-Length',str(end-start+1));self.end_headers()
            self.remaining=end-start+1;f=target.open('rb');f.seek(start);return f
        self.remaining=None;return super().send_head()
    def copyfile(self,source,outputfile):
        try:
            if self.remaining is None:return super().copyfile(source,outputfile)
            while self.remaining:
                data=source.read(min(65536,self.remaining))
                if not data:break
                outputfile.write(data);self.remaining-=len(data)
        except (BrokenPipeError,ConnectionResetError):pass
if __name__=='__main__':
    port=int(os.environ.get('PORT','18440'))
    print(f'Preview http://127.0.0.1:{port}',flush=True)
    ThreadingHTTPServer(('127.0.0.1',port),Handler).serve_forever()
