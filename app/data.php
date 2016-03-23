<?php
error_reporting(0);

if ($_GET['action'] == 'news')
{
  $lastId = $_GET['last_id'];
  $p = $_GET['p'];
  exit(json_encode(get_result($lastId, $p)));
}
elseif ($_GET['action'] == 'chat')
{
  $lastId = $_GET['last_id'];
  $p = $_GET['p'];
  exit(json_encode(get_result($lastId, $p)));
}

function get_result($lastId, $p)
{
  $result = array('html' => array(), 'lastId' => 0, 'p' => $p);
  $data = auto_make_data();
  $i = $lastId + 1;
  $size = $i + 20;
  for($i;$i <= $size; $i++)
  {
    $result['html'][] = '<li>'.$data[$i].'</li>';
  }
  $result['html'] = implode('',$result['html']);
  return $result;
}

function auto_make_data()
{
  $data = array();
  for ($i = 1; $i <= 1000; $i++)
  {
    $data[$i] = get_str($id);
  }
  return $data;
}

function get_str($id)
{
  $str = $id . ': “十三五”时期，我国经济发展进入新常态，出现新规律、呈现新特点，也将迎来新发展，收获新成就。习近平在五中全会的规划建议说明中指出：“新常态下，我国经济发展表现出速度变化、结构优化、动力转换三大特点，增长速度要从高速转向中高速，发展方式要从规模速度型转向质量效率型，经济结构调整要从增量扩能为主转向调整存量、做优增量并举，发展动力要从主要依靠资源和低成本劳动力等要素投入转向创新驱动。这些变化不依人的意志为转移，是我国经济发展阶段性特征的必然要求。制定‘十三五’时期经济社会发展建议，必须充分考虑这些趋势和要求，按照适应新常态、把握新常态、引领新常态的总要求进行战略谋划。”十二届全国人大四次会议通过的《中华人民共和国国民经济和社会发展第十三个五年规划纲要》从顶层设计上很好地适应、把握、引领了经济新常态，请随“学习中国”小编一起学习。';
  return $str;
}
