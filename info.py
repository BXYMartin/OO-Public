from sys import argv
import time
import re, os
script, first, second, third, last, out = argv

with open(first, "r") as info:
    temp = info.readlines()
flag = False
lines=[]
for line in temp:
    if line.startswith("END_OF_MODEL"):
        flag = True
        continue
    if flag:
        lines.append(line)
print("[i]  INFO: " + lines[int(second) - 1].strip())

p = re.compile(r'(.*?) ERROR')  #最小匹配
errors = re.findall(p, third)
tags = ""
fault = []
for error in errors:
    tag = str(error).strip().strip("[").strip("]")
    if tag in fault:
        continue
    tags = tags + "    - "
    if tag == "!":
        tags = tags + "CONFLICT"
    else:
        tags = tags + tag
        with open("./runtime/error.res", "a+") as err:
            err.write(tag + ".jar ")
    fault.append(tag)
    tags = tags + "\n"

diss=""

for file_name in os.listdir("./test_jar"):
    pre, ext = os.path.splitext(file_name)
    diss += '''
<li>
    <button class="icobutton"><span class="fa fa-thumbs-o-down"> {:s}</span><div class="count"><div class="number">Loading...</div></div></button>
</li>
'''.format(pre)

l = last.split(".")
mdj = l[0]
model = "Default"
num = "0"
if len(l[1].split("_")) == 3:
    model = l[1].split("_")[2]
    num = l[1].split("_")[1]
name = time.strftime("%Y-%m-%d-%H-%M-%S", time.localtime())
time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
with open("./docs/_posts/" + name + ".markdown", "w+") as log:
    content = """---
layout:     post
title:      "{:s} in {:s} test {:s}"
subtitle:   "Error Report"
date:       {:s}
author:     "BXYMartin"
header-img: "img/post-bg-2015.jpg"
tags:
{:s}
---

**Time: {:s}**

> “Critical Errors Occurred!”

## I've Fixed This Error
<div>Corresponding File: <label id="file">{:s}.markdown</label><br>Click Me To Resolve: <button class="btn" id="delete" onclick="del()"></button></div>
> Important Note: When you click this button, this report will be deleted on next commit, please make sure no one else could be affected by this bug.

## Not My Fault, Diss Others!
<div class="diss">
    <section class="content">
{:s}
    </section>
</div>

## Details

Error on line **{:s}**

```
{:s}
```

## Files

Model File:

[Source File](https://github.com/BXYMartin/OO-Public/blob/master/test_mdj/{:s}.mdj)

Error Info:

```
{:s}
```

Test Case:

```
{:s}
```


""".format(model, mdj, num, time, tags, time, name, diss, second, first, mdj, third, out)
    log.writelines(content)
