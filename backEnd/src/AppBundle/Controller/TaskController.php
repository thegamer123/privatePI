<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Task;

class TaskController extends Controller
{

    // GET all tasks 
    public function getAllTaskAction()
    {
        $em = $this->getDoctrine()->getManager();
        $teams = $em->getRepository('AppBundle:Task')->findAll();
        $data = $this->get('jms_serializer')->serialize($teams, 'json');
        $response = new Response($data);
        return $response;
    }


    // POST Team
    public function newTaskAction(Request $request) {
        
        $data = $request->getContent();
        //deserialize the data
        $task = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Task", "json");
        // add data to DB
        $em= $this->getDoctrine()->getManager();
        $em->persist($task);
        $em->flush();
        return new Response(($task->getId()), 201);
    }


    // Get one category by Id
    public function getTaskbyIdAction(Task $task) {
        $data = $this->get('jms_serializer')->serialize($task, 'json');
        $response = new Response($data);
        return $response;
    }

    // PUT edit Team by id
    public function editTaskAction(Request $request, $id) {

        $doctrine = $this->getDoctrine();
        $manager = $doctrine->getManager();
        $task_to_update = $doctrine->getRepository('AppBundle:Task')->find($id);
        $data = $request->getContent();
        $task = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Task", "json");
        $task_to_update->setTitle($task->getTitle());
        $task_to_update->setdescription($task->getdescription());
        $task_to_update->setDuration($task->getDuration()); 
        $manager->persist($task_to_update);
        $manager->flush();
        return new Response('Task updated successfully', 200);
    }


    // DELETE delete Team project by id
    public function deleteTaskAction(Request $request) {
        $id = $request->get('id');
        $manager = $this->getDoctrine()->getManager();
        $team = $manager->getRepository('AppBundle:Task')->find($id);
        $manager->remove($team);
        $manager->flush();
        return new Response('task deleted successfully', 200);
    }

}