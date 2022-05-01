"""
This is a setup.py script generated by py2applet

Usage:
    python setup.py py2app
"""

import os
import shutil

from setuptools import setup

if os.path.exists('build'):
    shutil.rmtree('build')

if os.path.exists('dist/Hostly.app'):
    shutil.rmtree('dist/Hostly.app')

APP = ['src/hostly.py']
DATA_FILES = [
    'portal' # ReactJS Application
]
OPTIONS = {}

setup(
    name='Hostly',
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
