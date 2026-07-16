#!/usr/bin/env python3
"""
Generate original Miss Zhao Scratch 3 starter .sb3 files.

Original geometric SVG costumes + simple teaching scripts.
Not affiliated with Scratch Team. No Scratch Team library assets.
"""

from __future__ import annotations

import hashlib
import json
import uuid
import zipfile
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parents[1] / "site" / "scratch-projects"

# ---------------------------------------------------------------------------
# SVG costumes (original Miss Zhao / matchaxmoxie shapes)
# ---------------------------------------------------------------------------

SVG_BACKDROP = """<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#FFF4E6"/>
  <rect y="280" width="480" height="80" fill="#F2C96B"/>
  <circle cx="400" cy="70" r="36" fill="#E0763A"/>
  <text x="24" y="40" font-family="Comic Sans MS, Comic Neue, sans-serif" font-size="18" fill="#3D2E1F">Miss Zhao Studio</text>
</svg>
"""

SVG_SKY = """<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7EB8E0"/>
      <stop offset="100%" stop-color="#FFF4E6"/>
    </linearGradient>
  </defs>
  <rect width="480" height="360" fill="url(#g)"/>
  <ellipse cx="90" cy="70" rx="40" ry="18" fill="#fff" opacity="0.85"/>
  <ellipse cx="280" cy="50" rx="50" ry="20" fill="#fff" opacity="0.75"/>
</svg>
"""

SVG_PLACE_A = """<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#DCEBFA"/>
  <rect y="240" width="480" height="120" fill="#8FBF7A"/>
  <rect x="40" y="120" width="120" height="120" fill="#E8A87C"/>
  <polygon points="40,120 100,70 160,120" fill="#C45C3E"/>
  <text x="200" y="50" font-family="Comic Sans MS, sans-serif" font-size="22" fill="#3D2E1F">Place A</text>
</svg>
"""

SVG_PLACE_B = """<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#F8E8C8"/>
  <rect y="260" width="480" height="100" fill="#C9A66B"/>
  <circle cx="360" cy="90" r="40" fill="#E0763A"/>
  <text x="24" y="50" font-family="Comic Sans MS, sans-serif" font-size="22" fill="#3D2E1F">Place B</text>
</svg>
"""

SVG_ENDING = """<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#5C4B7A"/>
  <text x="140" y="180" font-family="Comic Sans MS, sans-serif" font-size="36" fill="#FFF4E6">The End</text>
  <text x="150" y="220" font-family="Comic Sans MS, sans-serif" font-size="16" fill="#F2C96B">Miss Zhao Studio</text>
</svg>
"""

SVG_DUCK = """<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <ellipse cx="48" cy="58" rx="28" ry="24" fill="#F2C96B"/>
  <circle cx="62" cy="36" r="18" fill="#F2C96B"/>
  <circle cx="68" cy="32" r="3" fill="#3D2E1F"/>
  <polygon points="78,36 94,40 78,46" fill="#E0763A"/>
  <ellipse cx="40" cy="78" rx="10" ry="4" fill="#C45C3E"/>
  <ellipse cx="58" cy="78" rx="10" ry="4" fill="#C45C3E"/>
</svg>
"""

SVG_DUCK_RUN = """<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <ellipse cx="48" cy="58" rx="28" ry="24" fill="#F2C96B"/>
  <circle cx="62" cy="36" r="18" fill="#F2C96B"/>
  <circle cx="68" cy="32" r="3" fill="#3D2E1F"/>
  <polygon points="78,36 94,40 78,46" fill="#E0763A"/>
  <ellipse cx="34" cy="80" rx="12" ry="4" fill="#C45C3E" transform="rotate(-20 34 80)"/>
  <ellipse cx="62" cy="76" rx="12" ry="4" fill="#C45C3E" transform="rotate(25 62 76)"/>
</svg>
"""

SVG_PLATFORM = """<svg xmlns="http://www.w3.org/2000/svg" width="220" height="40" viewBox="0 0 220 40">
  <rect width="220" height="40" rx="6" fill="#8FBF7A" stroke="#3D2E1F" stroke-width="3"/>
  <rect x="10" y="10" width="200" height="8" fill="#A8D48E"/>
</svg>
"""

SVG_BASKET = """<svg xmlns="http://www.w3.org/2000/svg" width="120" height="56" viewBox="0 0 120 56">
  <path d="M10,16 L20,50 L100,50 L110,16 Z" fill="#E8A87C" stroke="#3D2E1F" stroke-width="3"/>
  <path d="M20,16 Q60,0 100,16" fill="none" stroke="#3D2E1F" stroke-width="3"/>
</svg>
"""

SVG_APPLE = """<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="26" r="16" fill="#C45C3E"/>
  <rect x="22" y="6" width="4" height="10" fill="#5C4B7A"/>
  <ellipse cx="30" cy="12" rx="8" ry="4" fill="#8FBF7A"/>
</svg>
"""

SVG_PADDLE = """<svg xmlns="http://www.w3.org/2000/svg" width="140" height="24" viewBox="0 0 140 24">
  <rect width="140" height="24" rx="8" fill="#5C4B7A" stroke="#3D2E1F" stroke-width="3"/>
</svg>
"""

SVG_BALL = """<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
  <circle cx="18" cy="18" r="15" fill="#E0763A" stroke="#3D2E1F" stroke-width="2"/>
  <circle cx="12" cy="12" r="4" fill="#FFF4E6" opacity="0.7"/>
</svg>
"""

SVG_STAR = """<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
  <polygon points="40,6 48,30 74,30 52,46 60,70 40,54 20,70 28,46 6,30 32,30" fill="#F2C96B" stroke="#3D2E1F" stroke-width="2"/>
</svg>
"""

SVG_BTN = """<svg xmlns="http://www.w3.org/2000/svg" width="120" height="48" viewBox="0 0 120 48">
  <rect width="120" height="48" rx="10" fill="#7EB8E0" stroke="#3D2E1F" stroke-width="3"/>
  <text x="60" y="30" text-anchor="middle" font-family="Comic Sans MS, sans-serif" font-size="16" font-weight="700" fill="#3D2E1F">{label}</text>
</svg>
"""

SVG_GROUND = """<svg xmlns="http://www.w3.org/2000/svg" width="480" height="80" viewBox="0 0 480 80">
  <rect width="480" height="80" fill="#8FBF7A" stroke="#3D2E1F" stroke-width="3"/>
  <rect x="0" y="0" width="480" height="14" fill="#A8D48E"/>
  <circle cx="60" cy="40" r="8" fill="#6FA35E"/>
  <circle cx="180" cy="50" r="6" fill="#6FA35E"/>
  <circle cx="320" cy="38" r="9" fill="#6FA35E"/>
  <circle cx="420" cy="48" r="7" fill="#6FA35E"/>
</svg>
"""

SVG_PET_HAPPY = """<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <ellipse cx="50" cy="58" rx="32" ry="28" fill="#E8A87C"/>
  <circle cx="50" cy="36" r="22" fill="#E8A87C"/>
  <circle cx="42" cy="34" r="3" fill="#3D2E1F"/>
  <circle cx="58" cy="34" r="3" fill="#3D2E1F"/>
  <path d="M42,44 Q50,52 58,44" fill="none" stroke="#3D2E1F" stroke-width="2"/>
  <ellipse cx="28" cy="22" rx="8" ry="12" fill="#C45C3E"/>
  <ellipse cx="72" cy="22" rx="8" ry="12" fill="#C45C3E"/>
</svg>
"""

SVG_PET_HUNGRY = """<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <ellipse cx="50" cy="58" rx="32" ry="28" fill="#E8A87C"/>
  <circle cx="50" cy="36" r="22" fill="#E8A87C"/>
  <circle cx="42" cy="34" r="3" fill="#3D2E1F"/>
  <circle cx="58" cy="34" r="3" fill="#3D2E1F"/>
  <ellipse cx="50" cy="48" rx="6" ry="4" fill="#3D2E1F"/>
  <ellipse cx="28" cy="22" rx="8" ry="12" fill="#C45C3E"/>
  <ellipse cx="72" cy="22" rx="8" ry="12" fill="#C45C3E"/>
  <text x="70" y="20" font-size="16">?</text>
</svg>
"""

SVG_BODY1 = """<svg xmlns="http://www.w3.org/2000/svg" width="80" height="120" viewBox="0 0 80 120">
  <ellipse cx="40" cy="70" rx="26" ry="34" fill="#F2C96B"/>
  <circle cx="40" cy="28" r="22" fill="#F8D9A8"/>
  <circle cx="32" cy="26" r="3" fill="#3D2E1F"/>
  <circle cx="48" cy="26" r="3" fill="#3D2E1F"/>
  <path d="M34,36 Q40,40 46,36" fill="none" stroke="#3D2E1F" stroke-width="2"/>
</svg>
"""

SVG_BODY2 = """<svg xmlns="http://www.w3.org/2000/svg" width="80" height="120" viewBox="0 0 80 120">
  <ellipse cx="40" cy="70" rx="26" ry="34" fill="#7EB8E0"/>
  <circle cx="40" cy="28" r="22" fill="#D4A574"/>
  <circle cx="32" cy="26" r="3" fill="#3D2E1F"/>
  <circle cx="48" cy="26" r="3" fill="#3D2E1F"/>
  <path d="M34,36 Q40,40 46,36" fill="none" stroke="#3D2E1F" stroke-width="2"/>
</svg>
"""

SVG_HAT1 = """<svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" viewBox="0 0 90 50">
  <ellipse cx="45" cy="38" rx="40" ry="8" fill="#5C4B7A"/>
  <rect x="20" y="8" width="50" height="28" rx="6" fill="#5C4B7A"/>
</svg>
"""

SVG_HAT2 = """<svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" viewBox="0 0 90 50">
  <polygon points="45,2 78,40 12,40" fill="#E0763A" stroke="#3D2E1F" stroke-width="2"/>
</svg>
"""

SVG_SHIRT1 = """<svg xmlns="http://www.w3.org/2000/svg" width="70" height="50" viewBox="0 0 70 50">
  <path d="M10,10 L25,5 L35,18 L45,5 L60,10 L55,45 L15,45 Z" fill="#C45C3E" stroke="#3D2E1F" stroke-width="2"/>
</svg>
"""

SVG_SHIRT2 = """<svg xmlns="http://www.w3.org/2000/svg" width="70" height="50" viewBox="0 0 70 50">
  <path d="M10,10 L25,5 L35,18 L45,5 L60,10 L55,45 L15,45 Z" fill="#8FBF7A" stroke="#3D2E1F" stroke-width="2"/>
</svg>
"""

SVG_FRIEND = """<svg xmlns="http://www.w3.org/2000/svg" width="80" height="110" viewBox="0 0 80 110">
  <ellipse cx="40" cy="70" rx="24" ry="30" fill="#7EB8E0"/>
  <circle cx="40" cy="30" r="20" fill="#F8D9A8"/>
  <circle cx="33" cy="28" r="3" fill="#3D2E1F"/>
  <circle cx="47" cy="28" r="3" fill="#3D2E1F"/>
  <path d="M33,38 Q40,44 47,38" fill="none" stroke="#3D2E1F" stroke-width="2"/>
</svg>
"""

SVG_ARROW = """<svg xmlns="http://www.w3.org/2000/svg" width="56" height="40" viewBox="0 0 56 40">
  <rect width="56" height="40" rx="8" fill="#F2C96B" stroke="#3D2E1F" stroke-width="3"/>
  <polygon points="18,10 38,20 18,30" fill="#3D2E1F"/>
</svg>
"""


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def uid() -> str:
    return uuid.uuid4().hex[:20]


def md5_bytes(data: bytes) -> str:
    return hashlib.md5(data).hexdigest()


def costume(name: str, svg: str, cx: float, cy: float) -> tuple[dict, bytes, str]:
    raw = svg.encode("utf-8")
    digest = md5_bytes(raw)
    meta = {
        "assetId": digest,
        "name": name,
        "md5ext": f"{digest}.svg",
        "dataFormat": "svg",
        "rotationCenterX": cx,
        "rotationCenterY": cy,
    }
    return meta, raw, f"{digest}.svg"


class BlockBuilder:
    def __init__(self) -> None:
        self.blocks: dict[str, dict] = {}

    def add(self, opcode: str, **kwargs) -> str:
        bid = uid()
        block = {
            "opcode": opcode,
            "next": None,
            "parent": None,
            "inputs": {},
            "fields": {},
            "shadow": False,
            "topLevel": False,
        }
        block.update(kwargs)
        self.blocks[bid] = block
        return bid

    def shadow_num(self, value) -> str:
        bid = self.add("math_number", shadow=True, fields={"NUM": [str(value), None]})
        return bid

    def shadow_text(self, value: str) -> str:
        bid = self.add("text", shadow=True, fields={"TEXT": [str(value), None]})
        return bid

    def chain(self, *ids: str) -> str:
        for i, bid in enumerate(ids):
            if i == 0:
                self.blocks[bid]["topLevel"] = True
                self.blocks[bid]["x"] = 40
                self.blocks[bid]["y"] = 40 + (len([b for b in self.blocks.values() if b.get("topLevel")]) - 1) * 20
            else:
                prev = ids[i - 1]
                self.blocks[prev]["next"] = bid
                self.blocks[bid]["parent"] = prev
        return ids[0]

    def attach_input(self, parent: str, name: str, child: str, shadow: str | None = None) -> None:
        self.blocks[child]["parent"] = parent
        if shadow:
            self.blocks[shadow]["parent"] = parent
            self.blocks[parent]["inputs"][name] = [3, child, shadow]
        else:
            # 2 = block with no shadow; 1 = shadow only
            if self.blocks[child].get("shadow"):
                self.blocks[parent]["inputs"][name] = [1, child]
            else:
                self.blocks[parent]["inputs"][name] = [2, child]

    def attach_substack(self, parent: str, name: str, first: str) -> None:
        self.blocks[first]["parent"] = parent
        self.blocks[parent]["inputs"][name] = [2, first]

    def var_reporter(self, name: str, var_id: str) -> list:
        return [12, name, var_id]

    def when_flag(self) -> str:
        return self.add("event_whenflagclicked", topLevel=True, x=40, y=40)

    def when_clicked(self) -> str:
        return self.add("event_whenthisspriteclicked", topLevel=True, x=40, y=40)

    def when_broadcast(self, msg: str, msg_id: str) -> str:
        return self.add(
            "event_whenbroadcastreceived",
            topLevel=True,
            x=40,
            y=200,
            fields={"BROADCAST_OPTION": [msg, msg_id]},
        )

    def forever(self) -> str:
        return self.add("control_forever")

    def wait(self, secs: float) -> str:
        bid = self.add("control_wait")
        sh = self.shadow_num(secs)
        self.attach_input(bid, "DURATION", sh)
        return bid

    def if_(self) -> str:
        return self.add("control_if")

    def if_else(self) -> str:
        return self.add("control_if_else")

    def set_var(self, name: str, var_id: str, value) -> str:
        bid = self.add("data_setvariableto", fields={"VARIABLE": [name, var_id]})
        if isinstance(value, list):
            self.blocks[bid]["inputs"]["VALUE"] = [2, value]
        else:
            sh = self.shadow_text(value)
            self.attach_input(bid, "VALUE", sh)
        return bid

    def change_var(self, name: str, var_id: str, value) -> str:
        bid = self.add("data_changevariableby", fields={"VARIABLE": [name, var_id]})
        if isinstance(value, list):
            self.blocks[bid]["inputs"]["VALUE"] = [2, value]
        else:
            sh = self.shadow_num(value)
            self.attach_input(bid, "VALUE", sh)
        return bid

    def goto(self, x, y) -> str:
        bid = self.add("motion_gotoxy")
        sx = self.shadow_num(x)
        sy = self.shadow_num(y)
        self.attach_input(bid, "X", sx)
        self.attach_input(bid, "Y", sy)
        return bid

    def set_x(self, x) -> str:
        bid = self.add("motion_setx")
        sh = self.shadow_num(x)
        self.attach_input(bid, "X", sh)
        return bid

    def set_y(self, y) -> str:
        bid = self.add("motion_sety")
        sh = self.shadow_num(y)
        self.attach_input(bid, "Y", sh)
        return bid

    def change_x(self, n) -> str:
        bid = self.add("motion_changexby")
        sh = self.shadow_num(n)
        self.attach_input(bid, "DX", sh)
        return bid

    def change_y(self, n) -> str:
        bid = self.add("motion_changeyby")
        if isinstance(n, list):
            self.blocks[bid]["inputs"]["DY"] = [2, n]
        else:
            sh = self.shadow_num(n)
            self.attach_input(bid, "DY", sh)
        return bid

    def change_y_by_var(self, name: str, var_id: str) -> str:
        bid = self.add("motion_changeyby")
        self.blocks[bid]["inputs"]["DY"] = [2, self.var_reporter(name, var_id)]
        return bid

    def point_direction(self, deg) -> str:
        bid = self.add("motion_pointindirection")
        sh = self.shadow_num(deg)
        self.attach_input(bid, "DIRECTION", sh)
        return bid

    def move_steps(self, n) -> str:
        bid = self.add("motion_movesteps")
        sh = self.shadow_num(n)
        self.attach_input(bid, "STEPS", sh)
        return bid

    def if_on_edge_bounce(self) -> str:
        return self.add("motion_ifonedgebounce")

    def turn_right(self, deg) -> str:
        bid = self.add("motion_turnright")
        sh = self.shadow_num(deg)
        self.attach_input(bid, "DEGREES", sh)
        return bid

    def turn_left(self, deg) -> str:
        bid = self.add("motion_turnleft")
        sh = self.shadow_num(deg)
        self.attach_input(bid, "DEGREES", sh)
        return bid

    def key_pressed(self, key: str) -> str:
        menu = self.add("sensing_keyoptions", shadow=True, fields={"KEY_OPTION": [key, None]})
        bid = self.add("sensing_keypressed")
        self.attach_input(bid, "KEY_OPTION", menu)
        return bid

    def touching(self, target: str) -> str:
        menu = self.add(
            "sensing_touchingobjectmenu",
            shadow=True,
            fields={"TOUCHINGOBJECTMENU": [target, None]},
        )
        bid = self.add("sensing_touchingobject")
        self.attach_input(bid, "TOUCHINGOBJECTMENU", menu)
        return bid

    def mouse_x(self) -> str:
        return self.add("sensing_mousex")

    def set_x_to_mouse(self) -> str:
        bid = self.add("motion_setx")
        mx = self.mouse_x()
        self.attach_input(bid, "X", mx)
        return bid

    def say_for(self, text: str, secs: float) -> str:
        bid = self.add("looks_sayforsecs")
        st = self.shadow_text(text)
        ss = self.shadow_num(secs)
        self.attach_input(bid, "MESSAGE", st)
        self.attach_input(bid, "SECS", ss)
        return bid

    def say(self, text: str) -> str:
        bid = self.add("looks_say")
        st = self.shadow_text(text)
        self.attach_input(bid, "MESSAGE", st)
        return bid

    def next_costume(self) -> str:
        return self.add("looks_nextcostume")

    def switch_costume(self, name: str) -> str:
        menu = self.add("looks_costume", shadow=True, fields={"COSTUME": [name, None]})
        bid = self.add("looks_switchcostumeto")
        self.attach_input(bid, "COSTUME", menu)
        return bid

    def switch_backdrop(self, name: str) -> str:
        menu = self.add("looks_backdrops", shadow=True, fields={"BACKDROP": [name, None]})
        bid = self.add("looks_switchbackdropto")
        self.attach_input(bid, "BACKDROP", menu)
        return bid

    def change_size(self, n) -> str:
        bid = self.add("looks_changesizeby")
        sh = self.shadow_num(n)
        self.attach_input(bid, "CHANGE", sh)
        return bid

    def set_size(self, n) -> str:
        bid = self.add("looks_setsizeto")
        sh = self.shadow_num(n)
        self.attach_input(bid, "SIZE", sh)
        return bid

    def show(self) -> str:
        return self.add("looks_show")

    def hide(self) -> str:
        return self.add("looks_hide")

    def broadcast(self, msg: str, msg_id: str) -> str:
        # input uses broadcast shadow array form
        bid = self.add("event_broadcast")
        self.blocks[bid]["inputs"]["BROADCAST_INPUT"] = [1, [11, msg, msg_id]]
        return bid

    def ask(self, prompt: str) -> str:
        bid = self.add("sensing_askandwait")
        sh = self.shadow_text(prompt)
        self.attach_input(bid, "QUESTION", sh)
        return bid

    def op_lt(self, left, right) -> str:
        bid = self.add("operator_lt")
        self._op_inputs(bid, left, right)
        return bid

    def op_gt(self, left, right) -> str:
        bid = self.add("operator_gt")
        self._op_inputs(bid, left, right)
        return bid

    def op_equals(self, left, right) -> str:
        bid = self.add("operator_equals")
        self._op_inputs(bid, left, right)
        return bid

    def op_and(self, a: str, b: str) -> str:
        bid = self.add("operator_and")
        self.attach_input(bid, "OPERAND1", a)
        self.attach_input(bid, "OPERAND2", b)
        return bid

    def op_contains(self, haystack, needle) -> str:
        bid = self.add("operator_contains")
        if isinstance(haystack, list):
            self.blocks[bid]["inputs"]["STRING1"] = [2, haystack]
        else:
            sh = self.shadow_text(haystack)
            self.attach_input(bid, "STRING1", sh)
        sh2 = self.shadow_text(needle)
        self.attach_input(bid, "STRING2", sh2)
        return bid

    def op_random(self, a, b) -> str:
        bid = self.add("operator_random")
        sa = self.shadow_num(a)
        sb = self.shadow_num(b)
        self.attach_input(bid, "FROM", sa)
        self.attach_input(bid, "TO", sb)
        return bid

    def op_join(self, a, b) -> str:
        bid = self.add("operator_join")
        if isinstance(a, list):
            self.blocks[bid]["inputs"]["STRING1"] = [2, a]
        else:
            sa = self.shadow_text(a)
            self.attach_input(bid, "STRING1", sa)
        if isinstance(b, list):
            self.blocks[bid]["inputs"]["STRING2"] = [2, b]
        else:
            sb = self.shadow_text(b)
            self.attach_input(bid, "STRING2", sb)
        return bid

    def _op_inputs(self, bid: str, left, right) -> None:
        if isinstance(left, list):
            self.blocks[bid]["inputs"]["OPERAND1"] = [2, left]
        elif isinstance(left, str) and left in self.blocks:
            self.attach_input(bid, "OPERAND1", left)
        else:
            sh = self.shadow_text(left)
            self.attach_input(bid, "OPERAND1", sh)
        if isinstance(right, list):
            self.blocks[bid]["inputs"]["OPERAND2"] = [2, right]
        elif isinstance(right, str) and right in self.blocks:
            self.attach_input(bid, "OPERAND2", right)
        else:
            sh = self.shadow_text(right)
            self.attach_input(bid, "OPERAND2", sh)

    def y_position(self) -> str:
        return self.add("sensing_yposition")

    def x_position(self) -> str:
        return self.add("sensing_xposition")


def make_stage(costumes: list[tuple[dict, bytes, str]], variables: dict | None = None, broadcasts: dict | None = None) -> tuple[dict, list[tuple[str, bytes]]]:
    metas = []
    assets = []
    for meta, raw, filename in costumes:
        metas.append(meta)
        assets.append((filename, raw))
    stage = {
        "isStage": True,
        "name": "Stage",
        "variables": variables or {},
        "lists": {},
        "broadcasts": broadcasts or {},
        "blocks": {},
        "comments": {},
        "currentCostume": 0,
        "costumes": metas,
        "sounds": [],
        "volume": 100,
        "layerOrder": 0,
        "tempo": 60,
        "videoTransparency": 50,
        "videoState": "on",
        "textToSpeechLanguage": None,
    }
    return stage, assets


def make_sprite(
    name: str,
    costumes: list[tuple[dict, bytes, str]],
    *,
    x: float = 0,
    y: float = 0,
    size: float = 100,
    direction: float = 90,
    layer: int = 1,
    variables: dict | None = None,
    blocks: dict | None = None,
    rotation_style: str = "left-right",
) -> tuple[dict, list[tuple[str, bytes]]]:
    metas = []
    assets = []
    for meta, raw, filename in costumes:
        metas.append(meta)
        assets.append((filename, raw))
    sprite = {
        "isStage": False,
        "name": name,
        "variables": variables or {},
        "lists": {},
        "broadcasts": {},
        "blocks": blocks or {},
        "comments": {},
        "currentCostume": 0,
        "costumes": metas,
        "sounds": [],
        "volume": 100,
        "layerOrder": layer,
        "visible": True,
        "x": x,
        "y": y,
        "size": size,
        "direction": direction,
        "draggable": False,
        "rotationStyle": rotation_style,
    }
    return sprite, assets


def write_sb3(path: Path, targets: list[dict], assets: list[tuple[str, bytes]], monitors: list | None = None) -> None:
    # Deduplicate assets by filename
    asset_map = {}
    for filename, raw in assets:
        asset_map[filename] = raw
    project = {
        "targets": targets,
        "monitors": monitors or [],
        "extensions": [],
        "meta": {
            "semver": "3.0.0",
            "vm": "0.2.0-prerelease",
            "agent": "MissZhaoStudio/matchaxmoxie",
        },
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("project.json", json.dumps(project, separators=(",", ":")))
        for filename, raw in asset_map.items():
            zf.writestr(filename, raw)


def monitor(var_id: str, name: str, *, x: int = 5, y: int = 5, sprite: str | None = None) -> dict:
    return {
        "id": var_id if sprite is None else f"{sprite}_{name}",
        "mode": "default",
        "opcode": "data_variable",
        "params": {"VARIABLE": name},
        "spriteName": sprite,
        "value": 0,
        "width": 0,
        "height": 0,
        "x": x,
        "y": y,
        "visible": True,
        "sliderMin": 0,
        "sliderMax": 100,
        "isDiscrete": True,
    }


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

def project_jumping() -> None:
    yspeed = uid()
    stage, s_assets = make_stage([costume("classroom", SVG_BACKDROP, 240, 180)], {yspeed: ["y speed", 0]})
    bb = BlockBuilder()
    flag = bb.when_flag()
    go = bb.goto(-140, -72)
    set0 = bb.set_var("y speed", yspeed, 0)
    forever = bb.forever()
    bb.chain(flag, go, set0, forever)

    # inside forever: if space and on platform-ish (touching Platform) -> set y speed 12
    iff = bb.if_()
    key = bb.key_pressed("space")
    touch = bb.touching("Platform")
    cond = bb.op_and(key, touch)
    bb.attach_input(iff, "CONDITION", cond)
    set_jump = bb.set_var("y speed", yspeed, 12)
    bb.attach_substack(iff, "SUBSTACK", set_jump)

    change_y = bb.change_y_by_var("y speed", yspeed)
    grav = bb.change_var("y speed", yspeed, -1)

    land = bb.if_()
    land_touch = bb.touching("Platform")
    bb.attach_input(land, "CONDITION", land_touch)
    set_y = bb.set_y(-60)
    zero = bb.set_var("y speed", yspeed, 0)
    bb.blocks[set_y]["next"] = zero
    bb.blocks[zero]["parent"] = set_y
    bb.attach_substack(land, "SUBSTACK", set_y)

    left = bb.if_()
    left_key = bb.key_pressed("left arrow")
    bb.attach_input(left, "CONDITION", left_key)
    left_move = bb.change_x(-8)
    bb.attach_substack(left, "SUBSTACK", left_move)

    right = bb.if_()
    right_key = bb.key_pressed("right arrow")
    bb.attach_input(right, "CONDITION", right_key)
    right_move = bb.change_x(8)
    bb.attach_substack(right, "SUBSTACK", right_move)

    # chain inside forever
    bb.attach_substack(forever, "SUBSTACK", iff)
    bb.blocks[iff]["next"] = change_y
    bb.blocks[change_y]["parent"] = iff
    bb.blocks[change_y]["next"] = grav
    bb.blocks[grav]["parent"] = change_y
    bb.blocks[grav]["next"] = land
    bb.blocks[land]["parent"] = grav
    bb.blocks[land]["next"] = left
    bb.blocks[left]["parent"] = land
    bb.blocks[left]["next"] = right
    bb.blocks[right]["parent"] = left

    duck, d_assets = make_sprite(
        "Player",
        [costume("duck", SVG_DUCK, 48, 48)],
        x=-140,
        y=-72,
        layer=2,
        blocks=bb.blocks,
    )
    platform, p_assets = make_sprite(
        "Platform",
        [costume("ground", SVG_PLATFORM, 110, 20)],
        x=0,
        y=-100,
        layer=1,
        rotation_style="don't rotate",
    )
    write_sb3(
        OUT_DIR / "jumping-game.sb3",
        [stage, duck, platform],
        s_assets + d_assets + p_assets,
        [monitor(yspeed, "y speed", x=5, y=5)],
    )


def project_catch() -> None:
    score = uid()
    stage, s_assets = make_stage([costume("classroom", SVG_BACKDROP, 240, 180)], {score: ["score", 0]})

    # Basket
    bb = BlockBuilder()
    flag = bb.when_flag()
    go = bb.goto(0, -140)
    forever = bb.forever()
    bb.chain(flag, go, forever)
    left = bb.if_()
    bb.attach_input(left, "CONDITION", bb.key_pressed("left arrow"))
    bb.attach_substack(left, "SUBSTACK", bb.change_x(-10))
    right = bb.if_()
    bb.attach_input(right, "CONDITION", bb.key_pressed("right arrow"))
    bb.attach_substack(right, "SUBSTACK", bb.change_x(10))
    bb.attach_substack(forever, "SUBSTACK", left)
    bb.blocks[left]["next"] = right
    bb.blocks[right]["parent"] = left
    basket, b_assets = make_sprite(
        "Basket",
        [costume("basket", SVG_BASKET, 60, 28)],
        x=0,
        y=-140,
        layer=2,
        blocks=bb.blocks,
        rotation_style="don't rotate",
    )

    # Apple
    ab = BlockBuilder()
    flag = ab.when_flag()
    set_score = ab.set_var("score", score, 0)
    reset = ab.goto(0, 160)  # will replace x with random via set x after
    forever = ab.forever()
    ab.chain(flag, set_score, reset, forever)

    # At start also randomize x — insert after reset using set_x with random
    # Rebuild start: flag -> set score -> set y 160 -> set x random -> forever
    ab2 = BlockBuilder()
    flag = ab2.when_flag()
    set_score = ab2.set_var("score", score, 0)
    sety = ab2.set_y(160)
    setx = ab2.add("motion_setx")
    rnd = ab2.op_random(-200, 200)
    ab2.attach_input(setx, "X", rnd)
    forever = ab2.forever()
    ab2.chain(flag, set_score, sety, setx, forever)

    fall = ab2.change_y(-6)
    catch = ab2.if_()
    ab2.attach_input(catch, "CONDITION", ab2.touching("Basket"))
    add = ab2.change_var("score", score, 1)
    say = ab2.say_for("catch!", 0.4)
    reset_y = ab2.set_y(160)
    reset_x = ab2.add("motion_setx")
    ab2.attach_input(reset_x, "X", ab2.op_random(-200, 200))
    ab2.blocks[add]["next"] = say
    ab2.blocks[say]["parent"] = add
    ab2.blocks[say]["next"] = reset_y
    ab2.blocks[reset_y]["parent"] = say
    ab2.blocks[reset_y]["next"] = reset_x
    ab2.blocks[reset_x]["parent"] = reset_y
    ab2.attach_substack(catch, "SUBSTACK", add)

    miss = ab2.if_()
    ypos = ab2.y_position()
    ab2.attach_input(miss, "CONDITION", ab2.op_lt(ypos, -170))
    my = ab2.set_y(160)
    mx = ab2.add("motion_setx")
    ab2.attach_input(mx, "X", ab2.op_random(-200, 200))
    ab2.blocks[my]["next"] = mx
    ab2.blocks[mx]["parent"] = my
    ab2.attach_substack(miss, "SUBSTACK", my)

    ab2.attach_substack(forever, "SUBSTACK", fall)
    ab2.blocks[fall]["next"] = catch
    ab2.blocks[catch]["parent"] = fall
    ab2.blocks[catch]["next"] = miss
    ab2.blocks[miss]["parent"] = catch

    apple, a_assets = make_sprite(
        "Apple",
        [costume("apple", SVG_APPLE, 24, 24)],
        x=0,
        y=160,
        layer=3,
        blocks=ab2.blocks,
    )
    write_sb3(
        OUT_DIR / "catch-game.sb3",
        [stage, basket, apple],
        s_assets + b_assets + a_assets,
        [monitor(score, "score", x=5, y=5)],
    )


def project_pong() -> None:
    lives = uid()
    stage, s_assets = make_stage([costume("classroom", SVG_BACKDROP, 240, 180)], {lives: ["lives", 3]})

    pb = BlockBuilder()
    flag = pb.when_flag()
    sety = pb.set_y(-150)
    forever = pb.forever()
    pb.chain(flag, sety, forever)
    follow = pb.set_x_to_mouse()
    pb.attach_substack(forever, "SUBSTACK", follow)
    paddle, p_assets = make_sprite(
        "Paddle",
        [costume("paddle", SVG_PADDLE, 70, 12)],
        x=0,
        y=-150,
        layer=2,
        blocks=pb.blocks,
        rotation_style="don't rotate",
    )

    bb = BlockBuilder()
    flag = bb.when_flag()
    set_lives = bb.set_var("lives", lives, 3)
    go = bb.goto(0, 0)
    point = bb.point_direction(45)
    forever = bb.forever()
    bb.chain(flag, set_lives, go, point, forever)

    move = bb.move_steps(8)
    bounce = bb.if_on_edge_bounce()
    hit = bb.if_()
    bb.attach_input(hit, "CONDITION", bb.touching("Paddle"))
    turn = bb.point_direction(-45)
    bb.attach_substack(hit, "SUBSTACK", turn)

    miss = bb.if_()
    ypos = bb.y_position()
    bb.attach_input(miss, "CONDITION", bb.op_lt(ypos, -170))
    lose = bb.change_var("lives", lives, -1)
    reset = bb.goto(0, 0)
    check = bb.if_()
    bb.attach_input(check, "CONDITION", bb.op_lt([12, "lives", lives], 1))
    say = bb.say_for("nice try!", 2)
    stop = bb.add("control_stop", fields={"STOP_OPTION": ["all", None]}, mutation={"tagName": "mutation", "children": [], "hasnext": "false"})
    bb.blocks[say]["next"] = stop
    bb.blocks[stop]["parent"] = say
    bb.attach_substack(check, "SUBSTACK", say)
    bb.blocks[lose]["next"] = reset
    bb.blocks[reset]["parent"] = lose
    bb.blocks[reset]["next"] = check
    bb.blocks[check]["parent"] = reset
    bb.attach_substack(miss, "SUBSTACK", lose)

    bb.attach_substack(forever, "SUBSTACK", move)
    bb.blocks[move]["next"] = bounce
    bb.blocks[bounce]["parent"] = move
    bb.blocks[bounce]["next"] = hit
    bb.blocks[hit]["parent"] = bounce
    bb.blocks[hit]["next"] = miss
    bb.blocks[miss]["parent"] = hit

    ball, ball_assets = make_sprite(
        "Ball",
        [costume("ball", SVG_BALL, 18, 18)],
        x=0,
        y=0,
        layer=3,
        blocks=bb.blocks,
        rotation_style="all around",
    )
    write_sb3(
        OUT_DIR / "pong-game.sb3",
        [stage, paddle, ball],
        s_assets + p_assets + ball_assets,
        [monitor(lives, "lives", x=5, y=5)],
    )


def project_clicker() -> None:
    points = uid()
    power = uid()
    cost = uid()
    variables = {
        points: ["points", 0],
        power: ["click power", 1],
        cost: ["upgrade cost", 10],
    }
    stage, s_assets = make_stage([costume("classroom", SVG_BACKDROP, 240, 180)], variables)

    sb = BlockBuilder()
    flag = sb.when_flag()
    a = sb.set_var("points", points, 0)
    b = sb.set_var("click power", power, 1)
    c = sb.set_var("upgrade cost", cost, 10)
    sb.chain(flag, a, b, c)
    # Put init on stage via a hidden helper? Stage can have blocks.
    stage["blocks"] = sb.blocks

    cb = BlockBuilder()
    click = cb.when_clicked()
    add = cb.add("data_changevariableby", fields={"VARIABLE": ["points", points]})
    cb.blocks[add]["inputs"]["VALUE"] = [2, [12, "click power", power]]
    grow = cb.change_size(15)
    wait = cb.wait(0.1)
    shrink = cb.change_size(-15)
    cb.chain(click, add, grow, wait, shrink)
    star, star_assets = make_sprite(
        "Star",
        [costume("star", SVG_STAR, 40, 40)],
        x=0,
        y=20,
        size=120,
        layer=2,
        blocks=cb.blocks,
    )

    ub = BlockBuilder()
    click = ub.when_clicked()
    iff = ub.if_()
    # points >= upgrade cost
    ub.attach_input(iff, "CONDITION", ub.op_gt([12, "points", points], [12, "upgrade cost", cost]))
    # Actually need >= ; use not lt: points < cost is false. Simpler: use gt with cost-1 via equals or gt.
    # Scratch kids use >= ; operator_gt with equal edge misses. Use: not (points < cost)
    # Rebuild condition as operator_lt inverted — Scratch has no not easily without operator_not
    ub2 = BlockBuilder()
    click = ub2.when_clicked()
    iff = ub2.if_()
    lt = ub2.op_lt([12, "points", points], [12, "upgrade cost", cost])
    # Use if_else: if points < cost -> say no; else buy
    ie = ub2.if_else()
    ub2.attach_input(ie, "CONDITION", lt)
    no = ub2.say_for("need more points", 1)
    ub2.attach_substack(ie, "SUBSTACK", no)
    # else: subtract cost, +1 power, +10 cost
    sub = ub2.add("data_changevariableby", fields={"VARIABLE": ["points", points]})
    # change by (0 - cost) = negate: use operator_subtract
    neg = ub2.add("operator_subtract")
    z = ub2.shadow_num(0)
    ub2.attach_input(neg, "NUM1", z)
    ub2.blocks[neg]["inputs"]["NUM2"] = [2, [12, "upgrade cost", cost]]
    ub2.blocks[sub]["inputs"]["VALUE"] = [2, neg]
    ub2.blocks[neg]["parent"] = sub
    pow_up = ub2.change_var("click power", power, 1)
    cost_up = ub2.change_var("upgrade cost", cost, 10)
    yes = ub2.say_for("upgraded!", 0.8)
    ub2.blocks[sub]["next"] = pow_up
    ub2.blocks[pow_up]["parent"] = sub
    ub2.blocks[pow_up]["next"] = cost_up
    ub2.blocks[cost_up]["parent"] = pow_up
    ub2.blocks[cost_up]["next"] = yes
    ub2.blocks[yes]["parent"] = cost_up
    ub2.attach_substack(ie, "SUBSTACK2", sub)
    ub2.chain(click, ie)

    # forever say cost
    flag = ub2.when_flag()
    forever = ub2.forever()
    ub2.chain(flag, forever)
    joined = ub2.op_join("Upgrade: ", [12, "upgrade cost", cost])
    say = ub2.add("looks_say")
    ub2.blocks[say]["inputs"]["MESSAGE"] = [2, joined]
    ub2.blocks[joined]["parent"] = say
    ub2.attach_substack(forever, "SUBSTACK", say)

    btn_svg = SVG_BTN.format(label="Upgrade")
    btn, btn_assets = make_sprite(
        "Upgrade",
        [costume("upgrade", btn_svg, 60, 24)],
        x=0,
        y=-120,
        layer=3,
        blocks=ub2.blocks,
        rotation_style="don't rotate",
    )
    write_sb3(
        OUT_DIR / "clicker-game.sb3",
        [stage, star, btn],
        s_assets + star_assets + btn_assets,
        [
            monitor(points, "points", x=5, y=5),
            monitor(power, "click power", x=5, y=35),
            monitor(cost, "upgrade cost", x=5, y=65),
        ],
    )


def project_scroll() -> None:
    stage, s_assets = make_stage([costume("sky", SVG_SKY, 240, 180)])

    hb = BlockBuilder()
    flag = hb.when_flag()
    go = hb.goto(-40, -40)
    forever = hb.forever()
    hb.chain(flag, go, forever)
    nextc = hb.next_costume()
    wait = hb.wait(0.12)
    hb.blocks[nextc]["next"] = wait
    hb.blocks[wait]["parent"] = nextc
    hb.attach_substack(forever, "SUBSTACK", nextc)
    hero, h_assets = make_sprite(
        "Hero",
        [costume("run1", SVG_DUCK, 48, 48), costume("run2", SVG_DUCK_RUN, 48, 48)],
        x=-40,
        y=-40,
        layer=3,
        blocks=hb.blocks,
    )

    def ground_blocks(partner: str, start_x: int) -> dict:
        gb = BlockBuilder()
        flag = gb.when_flag()
        sx = gb.set_x(start_x)
        sy = gb.set_y(-140)
        forever = gb.forever()
        gb.chain(flag, sx, sy, forever)
        move = gb.change_x(-4)
        wrap = gb.if_()
        xpos = gb.x_position()
        gb.attach_input(wrap, "CONDITION", gb.op_lt(xpos, -480))
        # set x to partner x + 480 — use sensing of other sprite via... Scratch needs "x position of Sprite".
        # Simpler: set x to 480 when past -480 (works for equal-width strips).
        reset = gb.set_x(480)
        gb.attach_substack(wrap, "SUBSTACK", reset)
        gb.attach_substack(forever, "SUBSTACK", move)
        gb.blocks[move]["next"] = wrap
        gb.blocks[wrap]["parent"] = move
        return gb.blocks

    g1, g1a = make_sprite(
        "Ground A",
        [costume("ground", SVG_GROUND, 240, 40)],
        x=0,
        y=-140,
        layer=1,
        blocks=ground_blocks("Ground B", 0),
        rotation_style="don't rotate",
    )
    g2, g2a = make_sprite(
        "Ground B",
        [costume("ground", SVG_GROUND, 240, 40)],
        x=480,
        y=-140,
        layer=2,
        blocks=ground_blocks("Ground A", 480),
        rotation_style="don't rotate",
    )
    write_sb3(OUT_DIR / "scrolling-background.sb3", [stage, g1, g2, hero], s_assets + g1a + g2a + h_assets)


def project_pet() -> None:
    hunger = uid()
    mood = uid()
    variables = {hunger: ["hunger", 7], mood: ["mood", 7]}
    stage, s_assets = make_stage([costume("classroom", SVG_BACKDROP, 240, 180)], variables)

    pb = BlockBuilder()
    flag = pb.when_flag()
    h = pb.set_var("hunger", hunger, 7)
    m = pb.set_var("mood", mood, 7)
    happy = pb.switch_costume("happy")
    forever = pb.forever()
    pb.chain(flag, h, m, happy, forever)
    wait = pb.wait(3)
    drop = pb.change_var("hunger", hunger, -1)
    # clamp hunger >= 0
    clamp = pb.if_()
    pb.attach_input(clamp, "CONDITION", pb.op_lt([12, "hunger", hunger], 0))
    pb.attach_substack(clamp, "SUBSTACK", pb.set_var("hunger", hunger, 0))
    look = pb.if_else()
    low_h = pb.op_lt([12, "hunger", hunger], 3)
    low_m = pb.op_lt([12, "mood", mood], 3)
    # or: if hunger < 3 OR mood < 3 — use operator_or
    or_ = pb.add("operator_or")
    pb.attach_input(or_, "OPERAND1", low_h)
    pb.attach_input(or_, "OPERAND2", low_m)
    pb.attach_input(look, "CONDITION", or_)
    pb.attach_substack(look, "SUBSTACK", pb.switch_costume("hungry"))
    pb.attach_substack(look, "SUBSTACK2", pb.switch_costume("happy"))
    pb.attach_substack(forever, "SUBSTACK", wait)
    pb.blocks[wait]["next"] = drop
    pb.blocks[drop]["parent"] = wait
    pb.blocks[drop]["next"] = clamp
    pb.blocks[clamp]["parent"] = drop
    pb.blocks[clamp]["next"] = look
    pb.blocks[look]["parent"] = clamp

    pet, pet_assets = make_sprite(
        "Pet",
        [costume("happy", SVG_PET_HAPPY, 50, 50), costume("hungry", SVG_PET_HUNGRY, 50, 50)],
        x=0,
        y=20,
        size=130,
        layer=2,
        blocks=pb.blocks,
    )

    def button(name: str, label: str, x: int, builder_fn) -> tuple[dict, list]:
        bb = BlockBuilder()
        builder_fn(bb)
        svg = SVG_BTN.format(label=label)
        return make_sprite(
            name,
            [costume(label.lower(), svg, 60, 24)],
            x=x,
            y=-130,
            layer=3,
            blocks=bb.blocks,
            rotation_style="don't rotate",
        )

    def feed(bb: BlockBuilder) -> None:
        click = bb.when_clicked()
        up = bb.change_var("hunger", hunger, 2)
        say = bb.say_for("nom!", 1)
        bb.chain(click, up, say)

    def play(bb: BlockBuilder) -> None:
        click = bb.when_clicked()
        up = bb.change_var("mood", mood, 2)
        down = bb.change_var("hunger", hunger, -1)
        t1 = bb.turn_right(15)
        t2 = bb.turn_left(30)
        t3 = bb.turn_right(15)
        bb.chain(click, up, down, t1, t2, t3)

    def rest(bb: BlockBuilder) -> None:
        click = bb.when_clicked()
        up = bb.change_var("mood", mood, 1)
        say = bb.say_for("zzz", 1)
        bb.chain(click, up, say)

    f, fa = button("Feed", "Feed", -140, feed)
    p, pa = button("Play", "Play", 0, play)
    r, ra = button("Rest", "Rest", 140, rest)

    write_sb3(
        OUT_DIR / "virtual-pet.sb3",
        [stage, pet, f, p, r],
        s_assets + pet_assets + fa + pa + ra,
        [
            monitor(hunger, "hunger", x=5, y=5),
            monitor(mood, "mood", x=5, y=35),
        ],
    )


def project_story() -> None:
    bright = uid()
    quiet = uid()
    scene2 = uid()
    broadcasts = {
        scene2: "scene2",
        bright: "ending-bright",
        quiet: "ending-quiet",
    }
    stage, s_assets = make_stage(
        [
            costume("Place A", SVG_PLACE_A, 240, 180),
            costume("Place B", SVG_PLACE_B, 240, 180),
            costume("Ending", SVG_ENDING, 240, 180),
        ],
        broadcasts=broadcasts,
    )

    # Hero narrates
    hb = BlockBuilder()
    flag = hb.when_flag()
    bd = hb.switch_backdrop("Place A")
    show = hb.show()
    go = hb.goto(-100, -40)
    s1 = hb.say_for("Hi! I am ready for a tiny adventure.", 2)
    s2 = hb.say_for("Want to go to Place B?", 2)
    bc = hb.broadcast("scene2", scene2)
    hb.chain(flag, bd, show, go, s1, s2, bc)

    # scene2
    recv = hb.when_broadcast("scene2", scene2)
    bd2 = hb.switch_backdrop("Place B")
    s3 = hb.say_for("The sun feels warm here.", 2)
    ask = hb.ask("Type yes for a bright ending, or no for a quiet one.")
    ie = hb.if_else()
    ans = [12, "answer", "answer"]  # wrong — answer is sensing_answer not variable
    # sensing_answer reporter
    answer = hb.add("sensing_answer")
    contains = hb.op_contains(answer, "yes")
    # fix op_contains for block id
    hb.blocks[contains]["inputs"]["STRING1"] = [2, answer]
    hb.blocks[answer]["parent"] = contains
    hb.attach_input(ie, "CONDITION", contains)
    hb.attach_substack(ie, "SUBSTACK", hb.broadcast("ending-bright", bright))
    hb.attach_substack(ie, "SUBSTACK2", hb.broadcast("ending-quiet", quiet))
    hb.chain(recv, bd2, s3, ask, ie)

    recv_b = hb.when_broadcast("ending-bright", bright)
    ebd = hb.switch_backdrop("Ending")
    es = hb.say_for("Bright ending: we celebrated with snacks!", 3)
    hb.chain(recv_b, ebd, es)

    recv_q = hb.when_broadcast("ending-quiet", quiet)
    ebd2 = hb.switch_backdrop("Ending")
    es2 = hb.say_for("Quiet ending: we watched the sunset.", 3)
    hb.chain(recv_q, ebd2, es2)

    hero, hero_a = make_sprite(
        "Hero",
        [costume("hero", SVG_DUCK, 48, 48)],
        x=-100,
        y=-40,
        layer=2,
        blocks=hb.blocks,
    )

    fb = BlockBuilder()
    flag = fb.when_flag()
    show = fb.show()
    go = fb.goto(110, -40)
    s = fb.say_for("I will help!", 2)
    fb.chain(flag, show, go, s)
    recv = fb.when_broadcast("scene2", scene2)
    s2 = fb.say_for("Choose carefully.", 2)
    fb.chain(recv, s2)
    friend, friend_a = make_sprite(
        "Friend",
        [costume("friend", SVG_FRIEND, 40, 55)],
        x=110,
        y=-40,
        layer=3,
        blocks=fb.blocks,
    )

    write_sb3(OUT_DIR / "story.sb3", [stage, hero, friend], s_assets + hero_a + friend_a)


def project_character() -> None:
    stage, s_assets = make_stage([costume("classroom", SVG_BACKDROP, 240, 180)])

    body_next = uid()
    hat_next = uid()
    shirt_next = uid()
    surprise = uid()
    broadcasts = {
        body_next: "body next",
        hat_next: "hat next",
        shirt_next: "shirt next",
        surprise: "surprise me",
    }
    stage["broadcasts"] = broadcasts

    bb = BlockBuilder()
    flag = bb.when_flag()
    c1 = bb.switch_costume("body1")
    go = bb.goto(0, -10)
    bb.chain(flag, c1, go)
    recv = bb.when_broadcast("body next", body_next)
    bb.chain(recv, bb.next_costume())
    recv_s = bb.when_broadcast("surprise me", surprise)
    # pick random: next costume twice randomly — use switch with random hard; just next costume
    n1 = bb.next_costume()
    bb.chain(recv_s, n1)
    body, body_a = make_sprite(
        "Body",
        [costume("body1", SVG_BODY1, 40, 60), costume("body2", SVG_BODY2, 40, 60)],
        x=0,
        y=-10,
        layer=1,
        blocks=bb.blocks,
        rotation_style="don't rotate",
    )

    hb = BlockBuilder()
    flag = hb.when_flag()
    hb.chain(flag, hb.switch_costume("hat1"), hb.goto(0, 55))
    hb.chain(hb.when_broadcast("hat next", hat_next), hb.next_costume())
    hb.chain(hb.when_broadcast("surprise me", surprise), hb.next_costume())
    hat, hat_a = make_sprite(
        "Hat",
        [costume("hat1", SVG_HAT1, 45, 30), costume("hat2", SVG_HAT2, 45, 30)],
        x=0,
        y=55,
        layer=3,
        blocks=hb.blocks,
        rotation_style="don't rotate",
    )

    sb = BlockBuilder()
    flag = sb.when_flag()
    sb.chain(flag, sb.switch_costume("shirt1"), sb.goto(0, 5))
    sb.chain(sb.when_broadcast("shirt next", shirt_next), sb.next_costume())
    sb.chain(sb.when_broadcast("surprise me", surprise), sb.next_costume())
    shirt, shirt_a = make_sprite(
        "Shirt",
        [costume("shirt1", SVG_SHIRT1, 35, 25), costume("shirt2", SVG_SHIRT2, 35, 25)],
        x=0,
        y=5,
        layer=2,
        blocks=sb.blocks,
        rotation_style="don't rotate",
    )

    def arrow_btn(label: str, msg: str, msg_id: str, x: int, y: int) -> tuple[dict, list]:
        b = BlockBuilder()
        click = b.when_clicked()
        b.chain(click, b.broadcast(msg, msg_id))
        return make_sprite(
            label,
            [costume("arrow", SVG_ARROW, 28, 20)],
            x=x,
            y=y,
            layer=4,
            blocks=b.blocks,
            rotation_style="don't rotate",
        )

    b1, b1a = arrow_btn("Body Next", "body next", body_next, -150, -140)
    b2, b2a = arrow_btn("Hat Next", "hat next", hat_next, 0, -140)
    b3, b3a = arrow_btn("Shirt Next", "shirt next", shirt_next, 150, -140)

    sur = BlockBuilder()
    click = sur.when_clicked()
    sur.chain(click, sur.broadcast("surprise me", surprise), sur.say_for("surprise!", 1))
    surprise_btn, surprise_a = make_sprite(
        "Surprise",
        [costume("surprise", SVG_BTN.format(label="Surprise"), 60, 24)],
        x=0,
        y=-90,
        layer=5,
        blocks=sur.blocks,
        rotation_style="don't rotate",
    )

    # Labels via say on green flag for buttons — optional small notes as comments in README
    write_sb3(
        OUT_DIR / "character-designer.sb3",
        [stage, body, shirt, hat, b1, b2, b3, surprise_btn],
        s_assets + body_a + shirt_a + hat_a + b1a + b2a + b3a + surprise_a,
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    project_jumping()
    project_catch()
    project_pong()
    project_clicker()
    project_scroll()
    project_pet()
    project_story()
    project_character()
    print(f"Wrote starters to {OUT_DIR}")
    for p in sorted(OUT_DIR.glob("*.sb3")):
        print(f"  {p.name} ({p.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
