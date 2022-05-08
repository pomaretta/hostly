# -*- mode: python -*-

block_cipher = None

added_files = [
    ('.\\portal', 'portal'),
]

a = Analysis(['.\\src\\hostly.py'],
             pathex=['.\\dist'],
             binaries=None,
             datas=added_files,
             hiddenimports=[

             ],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='Hostly',
          debug=False,
          strip=True,
          icon='.\\public\\icons\\logo.ico',
          upx=True,
          console=False) # set this to see error output of the executable
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=False,
               name='Hostly')