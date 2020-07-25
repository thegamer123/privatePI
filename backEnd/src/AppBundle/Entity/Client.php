<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Client
 *
 * @ORM\Table(name="client")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ClientRepository")
 */
class Client
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected  $id;

    /**
     * @var string
     *
     * @ORM\Column(name="social_reason", type="string", length=255)
     */
    protected  $social_reason;

    /**
     * @var string
     *
     * @ORM\Column(name="general_manager", type="string", length=255)
     */
    protected  $general_manager;

    /**
     * @var string
     *
     * @ORM\Column(name="address", type="string", length=255)
     */
    protected  $address;


    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     */
    protected  $email;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=255)
     */
    protected  $phone;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getSocialReason()
    {
        return $this->social_reason;
    }

    /**
     * @param string $social_reason
     */
    public function setSocialReason($social_reason)
    {
        $this->social_reason = $social_reason;
    }

    /**
     * @return string
     */
    public function getGeneralManager()
    {
        return $this->general_manager;
    }

    /**
     * @param string $general_manager
     */
    public function setGeneralManager($general_manager)
    {
        $this->general_manager = $general_manager;
    }



    /**
     * Set address
     *
     * @param string $address
     *
     * @return Client
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }



    /**
     * Set email
     *
     * @param string $email
     *
     * @return Client
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }


}

